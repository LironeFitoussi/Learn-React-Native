import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllExpenses: React.FC = () => {
  return (
      <ExpensesOutput periodName={'Total'} />
  );
};

export default AllExpenses;
