import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ExpenseChart = ({ transactions }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const monthlyTotals = {};
    transactions.forEach(tx => {
      const date = new Date(tx.date);
      if (!isNaN(date)) {
        const month = date.toLocaleString('default', { month: 'short' });
        monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(tx.amount);
      }
    });
    const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({ month, total }));
    setData(chartData);
  }, [transactions]);

  return (
    <div>
      <h2>📆 Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
