import { useState } from "react";
import { Button, Image, Modal, StyleSheet, TextInput, View } from "react-native";

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
    onModalClose()
    setEnteredGoal("");
  }

  return (
    <Modal visible={isModalOpen} animationType="slide">
      <View style={styles.inputContainer}>
        <Image 
          style={styles.image}
          source={require('../assets/images/goal.png')}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0"/>
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onModalClose} color="#f31282"/>
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
    padding: 16,
    backgroundColor: "#311b6b"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "90%",
    marginRight: 8,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 18
  },
  button: {
    width: 100,
    marginHorizontal: 8
  },
  image: {
    width: 100,
    height: 100,
    margin: 20
  }
});
