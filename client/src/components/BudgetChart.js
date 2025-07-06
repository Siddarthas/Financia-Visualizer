// src/components/BudgetChart.js
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BudgetChart = ({ budgets, transactions }) => {
  const actuals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const data = budgets.map((b) => ({
    category: b.category,
    Budget: b.amount,
    Actual: actuals[b.category] || 0,
  }));

  const hasData = data.some(d => d.Budget > 0 || d.Actual > 0);

  return (
    <div style={{ marginTop: '40px', width: '100%', height: '350px' }}>
      <h3>📉 Budget vs Actual</h3>
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#8884d8" />
            <Bar dataKey="Actual" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available for this month and year.</p>
      )}
    </div>
  );
};

export default BudgetChart;
