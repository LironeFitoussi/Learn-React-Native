import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

export default function App() {
  const [goalInput, setGoalInput] = useState('');
  const [goalsList, setGoalsList] = useState([]);

  function goalInputHandler(enteredText) {
    // console.log(enteredText);
    setGoalInput(enteredText);
  }

  function addGoalHandler() {
    setGoalInput('');
    // console.log('Goal added!');
    setGoalsList((prevGoals) => {
      return [...prevGoals, goalInput];
    });
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder='Your course goal!' onChangeText={goalInputHandler} value={goalInput} />
        <Button title='Add Goal' onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        <Text>List of goals...</Text>
        {goalsList.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Text style={styles.goalText}>
              {goal}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  textInput: {
    borderColor: '#cccccc',
    borderWidth: 1,
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white'
  }
});

