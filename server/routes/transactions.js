const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const newTx = new Transaction(req.body);
    await newTx.save();
    res.status(201).json(newTx);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save transaction' });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

module.exports = router;
