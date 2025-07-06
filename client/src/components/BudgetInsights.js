import React from 'react';

const BudgetInsights = ({ budgets, transactions }) => {
  const actuals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  return (
    <div style={{ marginTop: 20 }}>
      <h3>📢 Budget Insights</h3>
      <ul>
        {budgets.map(b => {
          const spent = actuals[b.category] || 0;
          const diff = b.amount - spent;
          return (
            <li key={b.category}>
              {diff >= 0
                ? `✅ Within budget for ${b.category} (₹${diff} left)`
                : `⚠️ Over budget in ${b.category} by ₹${Math.abs(diff)}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BudgetInsights;
