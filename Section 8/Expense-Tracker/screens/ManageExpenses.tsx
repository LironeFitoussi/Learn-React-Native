import { useExpenses } from "@/store/expenses-context";
import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import Button from "@/components/UI/Button";
import IconButton from "@/components/UI/IconButton";
import { GlobalStyles } from "@/constants/styles";
import { ManageExpensesProps } from "@/types";

function ManageExpenses({ route, navigation }: ManageExpensesProps) {
  const { addExpense, updateExpense, deleteExpense, expenses } = useExpenses();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  // Load existing expense data if editing
  useLayoutEffect(() => {
    if (isEditing && editedExpenseId) {
      const expense = expenses.find(exp => exp.id === editedExpenseId);
      if (expense) {
        setDescription(expense.description);
        setAmount(expense.amount.toString());
        // Ensure date is a Date object
        const expenseDate = expense.date instanceof Date ? expense.date : new Date(expense.date);
        setDate(expenseDate);
      }
    }
  }, [isEditing, editedExpenseId, expenses]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const deleteExpenseHandler = () => {
    Alert.alert("Are you sure you want to delete this expense?", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
        deleteExpense(editedExpenseId!);
        navigation.goBack();
      } },
    ]);
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    const amountValue = parseFloat(amount);
    
    if (description.trim().length === 0) {
      Alert.alert("Invalid input", "Please enter a description.");
      return;
    }
    
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert("Invalid input", "Please enter a valid amount.");
      return;
    }

    if (isEditing) {
      updateExpense(editedExpenseId!, {
        description: description.trim(),
        amount: amountValue,
        date: date,
      });
    } else {
      addExpense({
        description: description.trim(),
        amount: amountValue,
        date: date,
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="decimal-pad"
        />
        
        <Text style={styles.title}>Date</Text>
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString()}
          editable={false}
          placeholder="Date"
        />
        
        <Text style={styles.title}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
          autoCapitalize="sentences"
        />
      </View>

      <View style={styles.buttons}>
        <Button onPress={cancelHandler} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} mode="filled" style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  form: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpenses;
