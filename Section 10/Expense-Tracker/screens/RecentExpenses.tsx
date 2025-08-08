import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import React from 'react';
import { useExpenseApi } from '@/hooks/useExpenseApi';
import LoadingOverlay from '../components/UI/LoadingOverlay';

const RecentExpenses: React.FC = () => {
  const { expensesQuery } = useExpenseApi();
  const expenses = expensesQuery.data ?? [];
  if (expensesQuery.isLoading) return <LoadingOverlay message="Loading expenses..." />;
  if (expensesQuery.isError) return <LoadingOverlay message="Failed to load expenses" />;
  
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
