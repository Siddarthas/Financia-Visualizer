// src/components/TransactionList.js
import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  const today = new Date();
  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 30);

  // Filter only the transactions from the last 30 days
  const recentTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate >= last30Days && txDate <= today;
  });

  return (
    <div style={{ marginTop: '40px' }}>
      <h3>📄 Recent Transactions (Last 30 Days)</h3>
      {recentTransactions.length === 0 ? (
        <p>No transactions in the last 30 days.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Description</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Category</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Amount</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx) => (
              <tr key={tx._id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{new Date(tx.date).toLocaleDateString()}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{tx.description}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{tx.category}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>₹{tx.amount}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  <button onClick={() => handleDelete(tx._id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await fetch(`http://localhost:5000/transactions/${id}`, {
        method: 'DELETE',
      });
      onDelete(); // Refresh list
    }
  }
};

export default TransactionList;
