import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import { useExpenses } from '@/store/expenses-context';
import React from 'react';

const AllExpenses: React.FC = () => {
  const { expenses } = useExpenses();
  
  return (
      <ExpensesOutput expenses={expenses} periodName={'Total'} />
  );
};

export default AllExpenses;
