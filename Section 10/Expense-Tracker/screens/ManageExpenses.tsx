import { useExpenseApi } from "@/hooks/useExpenseApi";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useLayoutEffect, useState } from "react";
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import IconButton from "@/components/UI/IconButton";
import { GlobalStyles } from "@/constants/styles";
import { ExpenseFormData, ManageExpensesProps } from "@/types";

function ManageExpenses({ route, navigation }: ManageExpensesProps) {
  const { expensesQuery, addExpenseMutation, updateExpenseMutation, deleteExpenseMutation } = useExpenseApi();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get existing expense data for editing
  const selectedExpense = isEditing 
    ? (expensesQuery.data ?? []).find(expense => expense.id === editedExpenseId)
    : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  async function deleteExpenseHandler() {
    Alert.alert(
      "Delete Expense", 
      "Are you sure you want to delete this expense? This action cannot be undone.", 
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              setIsSubmitting(true);
              await deleteExpenseMutation.mutateAsync(editedExpenseId!);
              navigation.goBack();
            } catch (error) {
              const message = error instanceof Error && error.message
                ? error.message
                : "Failed to delete expense. Please try again.";
              Alert.alert("Error", message);
            } finally {
              setIsSubmitting(false);
            }
          }
        },
      ]
    );
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: ExpenseFormData) {
    try {
      setIsSubmitting(true);
      if (isEditing && editedExpenseId) {
        await updateExpenseMutation.mutateAsync({ id: editedExpenseId, expenseData });
      } else {
        await addExpenseMutation.mutateAsync(expenseData);
      }
      navigation.goBack();
    } catch (error) {
      const message = error instanceof Error && error.message
        ? error.message
        : "Failed to save expense. Please try again.";
      Alert.alert("Error", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) return <LoadingOverlay message={isEditing ? "Updating expense..." : "Saving expense..."} />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
    </TouchableWithoutFeedback>
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
