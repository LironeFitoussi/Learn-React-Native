import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import { useExpenses } from '@/store/expenses-context';
import React from 'react';

const RecentExpenses: React.FC = () => {
  const { expenses } = useExpenses();
  
  // Filter expenses from the last 7 days
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return expense.date >= date7DaysAgo;
  });
  
  return (
      <ExpensesOutput expenses={recentExpenses} periodName={'Last 7 days'} />
  );
};

export default RecentExpenses;
