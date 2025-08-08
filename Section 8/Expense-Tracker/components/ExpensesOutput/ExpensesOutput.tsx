import { GlobalStyles } from '@/constants/styles';
import { ExpensesOutputProps } from '@/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const ExpensesOutput: React.FC<ExpensesOutputProps> = ({
  expenses = [],
  periodName,
}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary 
        expenses={expenses}
        periodName={periodName || 'Last 7 days'} 
       />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

export default ExpensesOutput;
