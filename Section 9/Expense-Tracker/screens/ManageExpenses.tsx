import { useExpenses } from "@/store/expenses-context";
import { useLayoutEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";

import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import IconButton from "@/components/UI/IconButton";
import { GlobalStyles } from "@/constants/styles";
import { ExpenseFormData, ManageExpensesProps } from "@/types";

function ManageExpenses({ route, navigation }: ManageExpensesProps) {
  const { addExpense, updateExpense, deleteExpense, expenses } = useExpenses();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  // Get existing expense data for editing
  const selectedExpense = isEditing 
    ? expenses.find(expense => expense.id === editedExpenseId)
    : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  function deleteExpenseHandler() {
    Alert.alert(
      "Delete Expense", 
      "Are you sure you want to delete this expense? This action cannot be undone.", 
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            deleteExpense(editedExpenseId!);
            navigation.goBack();
          } 
        },
      ]
    );
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData: ExpenseFormData) {
    if (isEditing && editedExpenseId) {
      updateExpense(editedExpenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpenses;
