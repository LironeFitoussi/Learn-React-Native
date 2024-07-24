import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

// Components imports
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goalsList, setGoalsList] = useState([]);
  const [showModal, setShowModal] = useState(false)

  function addGoalHandler(enterdGoalText) {
    setGoalsList((prevGoals) => {
      return [
        ...prevGoals, 
        { text: enterdGoalText, id: Math.random().toString() }
      ];
    });
  }

  const deleteGoalHandler = (id) => {
    setGoalsList(prevGoals => prevGoals.filter(
      (goalItem) => goalItem.id !== id
    ))
  };

  const toggleGoalHandler = () => {
    setShowModal(!showModal)
  };

  return (
    <View style={styles.appContainer}>
      <Button title='Add New Goal' color='#5e0acc' onPress={toggleGoalHandler}/>
      <GoalInput onAdd={addGoalHandler} showModal={showModal} setShowModal={toggleGoalHandler}/>
      <View style={styles.goalsContainer}>
        <FlatList
          data={goalsList}
          renderItem={(itemData) => <GoalItem item={itemData.item} onDelete={deleteGoalHandler}/>}
          keyExtractor={(item, index) => item.id}
        />
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
  goalsContainer: {
    flex: 5,
  }
});

