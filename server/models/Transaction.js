const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  description: String,
  category: String,
  amount: Number,
  date: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
