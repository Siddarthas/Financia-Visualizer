const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// GET all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    console.error('Error fetching budgets:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST a new budget
router.post('/', async (req, res) => {
  const { category, amount } = req.body;

  if (!category || !amount) {
    return res.status(400).json({ message: 'Category and amount required' });
  }

  try {
    const newBudget = new Budget({ category, amount });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    console.error('Error saving budget:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
