// src/App.js
import React, { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import CategoryPieChart from './components/CategoryPieChart';
import SummaryCards from './components/SummaryCards';
import BudgetChart from './components/BudgetChart';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const txRes = await fetch('https://financia-visualizer.onrender.com/transactions');
      const txData = await txRes.json();
      setTransactions(txData);

      const budgetRes = await fetch('https://financia-visualizer.onrender.com/budgets');
      const budgetData = await budgetRes.json();
      setBudgets(budgetData);
    };
    fetchData();
  }, []);

  const availableMonths = Array.from(
    new Set(transactions.map((t) => new Date(t.date).getMonth() + 1))
  ).sort((a, b) => a - b);

  const availableYears = Array.from(
    new Set(transactions.map((t) => new Date(t.date).getFullYear()))
  ).sort((a, b) => a - b);

  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    const monthMatch = selectedMonth ? date.getMonth() + 1 === Number(selectedMonth) : true;
    const yearMatch = selectedYear ? date.getFullYear() === Number(selectedYear) : true;
    return monthMatch && yearMatch;
  });

  const recentTransactions = filteredTransactions.filter((t) => {
    const txDate = new Date(t.date);
    const today = new Date();
    const diff = (today - txDate) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  });

  const getMonthName = (num) => {
    if (!num) return '';
    return new Date(2000, num - 1).toLocaleString('default', { month: 'long' });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>💸 Personal Finance Dashboard</h1>

      <TransactionForm onAdd={() => window.location.reload()} />

      <div style={{ margin: '20px 0', display: 'flex', gap: '15px' }}>
        <div>
          <label>Select Month: </label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">All</option>
            {availableMonths.map((m) => (
              <option key={m} value={m}>
                {getMonthName(m)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Year: </label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">All</option>
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ margin: '10px 0', fontWeight: 'bold' }}>
        {selectedMonth || selectedYear ? (
          <div>
            Showing data for:{' '}
            <span style={{ color: '#007bff' }}>
              {selectedMonth ? getMonthName(selectedMonth) : 'All Months'}{' '}
              {selectedYear || 'All Years'}
            </span>
          </div>
        ) : (
          <div>Showing data for: <span style={{ color: '#007bff' }}>All Months and All Years</span></div>
        )}
      </div>

      <SummaryCards transactions={filteredTransactions} />
      <CategoryPieChart transactions={filteredTransactions} />
      <ExpenseChart transactions={filteredTransactions} />
      <BudgetChart budgets={budgets} transactions={filteredTransactions} />
      <TransactionList transactions={recentTransactions} onDelete={() => window.location.reload()} />
    </div>
  );
};

export default App;
