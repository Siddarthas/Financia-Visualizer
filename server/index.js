const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');

const app = express();

// CORS setup
app.use(cors({
  origin: '*', // You can specify your frontend URL here instead of '*'
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Routes
app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  const PORT = process.env.PORT || 5000; // ✅ Use dynamic port for Render
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Optional budget seeding route
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
