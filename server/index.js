const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');

const app = express();

// ✅ Allow all Vercel frontend URLs
const allowedOrigins = [
  'https://financia-visualizer-f2gl.vercel.app',
  'https://financia-visualizer-f2gl-git-main-siddarthas-projects-b806b847.vercel.app',
  'https://financia-visualizer-f2gl-ou9qswaif-siddarthas-projects-b806b847.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ Routes
app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// ✅ Optional seed route
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
