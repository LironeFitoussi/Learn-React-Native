import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { GlobalStyles } from '@/constants/styles';

type RootStackParamList = {
  ManageExpenses: { expenseId?: string } | undefined;
};

interface ManageExpensesProps {
  route: RouteProp<RootStackParamList, 'ManageExpenses'>;
  navigation: NavigationProp<RootStackParamList>;
}

function ManageExpenses({ route, navigation }: ManageExpensesProps) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {

  }, [])
  
  navigation.setOptions({
    title: isEditing ? 'Edit Expense' : 'Add Expense'
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? 'Edit Expense' : 'Add Expense'}
      </Text>
      {editedExpenseId && (
        <Text style={styles.expenseId}>Editing expense: {editedExpenseId}</Text>
      )}
      {/* Expense management form or content will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: GlobalStyles.colors.primary50,
    textAlign: 'center'
  },
  expenseId: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 16,
    textAlign: 'center'
  }
});

export default ManageExpenses;
