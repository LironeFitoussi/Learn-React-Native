import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecentExpenses: React.FC = () => {
  return (
      <ExpensesOutput periodName={'Last 7 days'} />
  );
};

export default RecentExpenses;
