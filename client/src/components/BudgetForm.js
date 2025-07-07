import React, { useState } from 'react';

const BudgetForm = ({ onSave }) => {
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://financia-visualizer.onrender.com/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, amount: parseFloat(amount) }),
      });

      if (!res.ok) throw new Error('Failed to save budget');

      setAmount('');
      if (onSave) onSave();
    } catch (err) {
      console.error('❌ Error saving budget:', err);
      alert('Error saving budget. Please try again later.');
    } finally {
      setLoading(false);
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
      <button type="submit" style={{ marginLeft: 10 }} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default BudgetForm;
