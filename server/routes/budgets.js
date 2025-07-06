// server/routes/budgets.js
const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// GET all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new budget
router.post('/', async (req, res) => {
  const { category, amount } = req.body;
  try {
    const newBudget = new Budget({ category, amount });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
