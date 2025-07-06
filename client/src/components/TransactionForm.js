import React, { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
  const predefinedDescriptions = ['Food', 'Rent', 'Travel', 'Shopping', 'Bills', 'Salary', 'Other'];

  const [selectedDesc, setSelectedDesc] = useState('Food');
  const [customDesc, setCustomDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = selectedDesc === 'Other' ? customDesc.trim() : selectedDesc;
    const category = selectedDesc === 'Other' ? 'Other' : selectedDesc;

    if (!description || !amount || !date) {
      alert('Please fill all fields.');
      return;
    }

    const newTransaction = {
      description,
      category,
      amount: parseFloat(amount),
      date
    };

    try {
      const res = await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (!res.ok) throw new Error('Failed to add transaction');

      setSelectedDesc('Food');
      setCustomDesc('');
      setAmount('');
      setDate('');
      if (onAdd) onAdd();
    } catch (err) {
      console.error(err);
      alert('Error adding transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <select value={selectedDesc} onChange={(e) => setSelectedDesc(e.target.value)}>
        {predefinedDescriptions.map((desc, i) => (
          <option key={i} value={desc}>{desc}</option>
        ))}
      </select>

      {selectedDesc === 'Other' && (
        <input
          placeholder="Enter custom description"
          value={customDesc}
          onChange={(e) => setCustomDesc(e.target.value)}
        />
      )}

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default TransactionForm;
