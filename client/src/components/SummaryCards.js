// src/components/SummaryCards.js
import React from 'react'; // Removed `useEffect`

const SummaryCards = ({ transactions }) => {
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
      <div style={{ flex: 1, padding: '20px', background: '#f1f5f9', borderRadius: '8px' }}>
        <h3>Total Expenses</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹ {total}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
