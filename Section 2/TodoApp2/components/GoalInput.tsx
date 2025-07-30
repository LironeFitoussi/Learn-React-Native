import { useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";
interface GoalInputProps {
  onAddGoal: (i: string) => void;
  onModalClose: () => void;
  isModalOpen: boolean;
}

export default function GoalInput({
  onAddGoal,
  isModalOpen,
  onModalClose,
}: GoalInputProps) {
  const [enteredGoal, setEnteredGoal] = useState("");

  function goalInputHandler(enteredText: string) {
    setEnteredGoal(enteredText);
  }

  function addGoalHandler() {
    onAddGoal(enteredGoal);
    setEnteredGoal("");
  }

  return (
    <Modal visible={isModalOpen} animationType="slide" onDismiss={onModalClose}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    padding: 16,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 18
  },
  button: {
    width: 100,
    marginHorizontal: 8
  }
});
