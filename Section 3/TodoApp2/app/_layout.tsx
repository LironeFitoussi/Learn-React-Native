import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";

// Components
import GoalInput from "@/components/GoalInput";
import GoalItem from "@/components/GoalItem";
export interface ICourseGoal {
  enteredText: string;
  id: string;
}

export default function HomeScreen() {
  const [courseGoals, setCourseGoals] = useState<ICourseGoal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  function addGoalHandler(enteredText: string) {
    console.log(enteredText);

    setCourseGoals((prevGoals) => [
      ...prevGoals,
      { enteredText, id: Math.random().toString() },
    ]);
  }

  function deleteGoalHandler(id: string) {
    console.log("DELETE");
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color="#3e0acc" onPress={() => setIsModalOpen(true)} />
      <GoalInput isModalOpen={isModalOpen} onAddGoal={addGoalHandler} onModalClose={() => setIsModalOpen(false)} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => (
            <GoalItem
              goal={itemData.item}
              onDeleteItem={deleteGoalHandler}
              goalId={itemData.item.id}
            />
          )}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
});
