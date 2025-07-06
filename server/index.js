const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes); // 👈 add this

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.error(err));

  app.get('/seed-budgets', async (req, res) => {
  const Budget = require('./models/Budget');
  await Budget.insertMany([
    { category: 'Food', amount: 10000 },
    { category: 'Transport', amount: 5000 },
    { category: 'Health', amount: 3000 }
  ]);
  res.send('Budgets seeded');
});
