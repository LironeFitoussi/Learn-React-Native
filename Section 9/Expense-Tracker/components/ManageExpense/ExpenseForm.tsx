import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/UI/Button";
import DateInput from "@/components/UI/DateInput";
import Input from "@/components/UI/Input";
import { GlobalStyles } from "@/constants/styles";
import { ExpenseFormProps } from "@/types";
import {
    validateAmountRealTime,
    validateDescriptionRealTime,
    validateExpenseForm
} from "@/utils/validation";

export default function ExpenseForm({ 
  onSubmit, 
  onCancel, 
  isEditing = false, 
  defaultValues 
}: ExpenseFormProps) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount?.toString() ?? "",
      isValid: true,
      errorMessage: "",
    },
    date: {
      value: defaultValues?.date ?? new Date(),
      isValid: true,
      errorMessage: "",
    },
    description: {
      value: defaultValues?.description ?? "",
      isValid: true,
      errorMessage: "",
    },
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: any) {
    setInputs((curInputs) => {
      const newInputs = {
        ...curInputs,
        [inputIdentifier]: { 
          value: enteredValue, 
          isValid: true, 
          errorMessage: "" 
        },
      };

      // Real-time validation for amount field
      if (inputIdentifier === "amount") {
        const validation = validateAmountRealTime(enteredValue);
        newInputs.amount.isValid = validation.isValid;
        newInputs.amount.errorMessage = validation.errorMessage;
      }

      // Real-time validation for description field
      if (inputIdentifier === "description") {
        const validation = validateDescriptionRealTime(enteredValue);
        newInputs.description.isValid = validation.isValid;
        newInputs.description.errorMessage = validation.errorMessage;
      }

      return newInputs;
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value.trim(),
    };

    // Comprehensive validation with specific error messages
    const validationResults = validateExpenseForm(
      inputs.amount.value,
      inputs.date.value,
      inputs.description.value
    );

    const hasErrors = !validationResults.amount.isValid || 
                     !validationResults.date.isValid || 
                     !validationResults.description.isValid;

    if (hasErrors) {
      setInputs((curInputs) => ({
        amount: { 
          value: curInputs.amount.value, 
          isValid: validationResults.amount.isValid,
          errorMessage: validationResults.amount.errorMessage 
        },
        date: { 
          value: curInputs.date.value, 
          isValid: validationResults.date.isValid,
          errorMessage: validationResults.date.errorMessage 
        },
        description: { 
          value: curInputs.description.value, 
          isValid: validationResults.description.isValid,
          errorMessage: validationResults.description.errorMessage 
        },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      
      <View style={styles.inputsRow}>
        <View style={styles.rowInput}>
          <Input
            label="Amount"
            isValid={inputs.amount.isValid}
            placeholder="0.00"
            maxLength={10}
            keyboardType="decimal-pad"
            onChangeText={(value) => inputChangedHandler("amount", value)}
            value={inputs.amount.value}
          />
          {!inputs.amount.isValid && inputs.amount.errorMessage && (
            <Text style={styles.fieldErrorText}>
              {inputs.amount.errorMessage}
            </Text>
          )}
        </View>
        
        <View style={styles.rowInput}>
          <DateInput
            label="Date"
            value={inputs.date.value}
            onDateChange={(date) => inputChangedHandler("date", date)}
            isValid={inputs.date.isValid}
            maximumDate={new Date()}
          />
          {!inputs.date.isValid && inputs.date.errorMessage && (
            <Text style={styles.fieldErrorText}>
              {inputs.date.errorMessage}
            </Text>
          )}
        </View>
      </View>

      <Input
        label="Description"
        isValid={inputs.description.isValid}
        placeholder="Enter description..."
        multiline
        onChangeText={(value) => inputChangedHandler("description", value)}
        value={inputs.description.value}
        autoCapitalize="sentences"
        autoCorrect={false}
        inputStyle={styles.inputMultiline}
        maxLength={100}
      />
      {!inputs.description.isValid && inputs.description.errorMessage && (
        <Text style={styles.fieldErrorText}>
          {inputs.description.errorMessage}
        </Text>
      )}

      {formIsInvalid && (
        <View style={styles.generalErrorContainer}>
          <Text style={styles.generalErrorText}>
            Please fix the errors above to continue
          </Text>
        </View>
      )}

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 32,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 16,
  },
  rowInput: {
    flex: 1,
  },
  inputMultiline: {
    minHeight: 120,
    textAlignVertical: "top",
    paddingTop: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    gap: 16,
  },
  button: {
    minWidth: 140,
  },
  fieldErrorText: {
    color: GlobalStyles.colors.error500,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  generalErrorContainer: {
    backgroundColor: "rgba(255, 99, 132, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 99, 132, 0.3)",
  },
  generalErrorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    fontSize: 14,
    fontWeight: "500",
  },
});
