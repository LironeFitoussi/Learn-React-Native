import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import React from 'react';
import { useExpenseApi } from '@/hooks/useExpenseApi';
import LoadingOverlay from '../components/UI/LoadingOverlay';

const AllExpenses: React.FC = () => {
  const { expensesQuery } = useExpenseApi();
  const expenses = expensesQuery.data ?? [];
  if (expensesQuery.isLoading) return <LoadingOverlay message="Loading expenses..." />;
  if (expensesQuery.isError) return <LoadingOverlay message="Failed to load expenses" />;
  
  return (
      <ExpensesOutput expenses={expenses} periodName={'Total'} />
  );
};

export default AllExpenses;
