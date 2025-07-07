import React, { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
  const predefinedDescriptions = ['Food', 'Rent', 'Travel', 'Shopping', 'Bills', 'Salary', 'Other'];

  const [selectedDesc, setSelectedDesc] = useState('Food');
  const [customDesc, setCustomDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const description = selectedDesc === 'Other' ? customDesc.trim() : selectedDesc;
      const category = selectedDesc === 'Other' ? 'Other' : selectedDesc;

      if (!description || !amount || !date) {
        throw new Error('Please fill all fields.');
      }

      const newTransaction = {
        description,
        category,
        amount: parseFloat(amount),
        date: new Date(date).toISOString() // Ensure consistent format
      };

      console.log('📤 Submitting:', newTransaction); // Debug log

      const res = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error (${res.status}): ${text}`);
      }
      const data = await res.json();
      console.log('✅ Server Response:', data);
      onAdd(data);
      setSelectedDesc('Food');
      setCustomDesc('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error('❌ Error adding transaction:', error);
      setError('Error adding transaction: ' + error.message);
      alert('Error adding transaction: ' + error.message);
    } finally {
      setLoading(false);
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
          required
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
