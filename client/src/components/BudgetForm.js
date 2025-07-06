import React, { useState } from 'react';

const BudgetForm = ({ onSave }) => {
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, amount: parseFloat(amount) }),
      });
      setAmount('');
      if (onSave) onSave();
    } catch (err) {
      console.error('Error saving budget:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>📊 Set Monthly Budget</h3>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {['Food', 'Rent', 'Travel', 'Shopping', 'Bills', 'Salary', 'Other'].map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Budget Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={{ marginLeft: 10 }}
      />
      <button type="submit" style={{ marginLeft: 10 }}>Save</button>
    </form>
  );
};

export default BudgetForm;
