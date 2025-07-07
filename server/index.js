const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');

const app = express();

// ✅ CORS setup (allow only your frontend domain for security)
app.use(cors({
  origin: 'https://financia-visualizer-f2gl.vercel.app', // <-- ✅ change to your deployed frontend
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ Routes
app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// ✅ Optional seeding route (safe to keep for testing)
app.get('/seed-budgets', async (req, res) => {
  const Budget = require('./models/Budget');
  try {
    await Budget.insertMany([
      { category: 'Food', amount: 10000 },
      { category: 'Transport', amount: 5000 },
      { category: 'Health', amount: 3000 }
    ]);
    res.send('Budgets seeded');
  } catch (err) {
    res.status(500).send('Failed to seed budgets');
  }
});
