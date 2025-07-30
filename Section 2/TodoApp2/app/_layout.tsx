import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

// Components
import GoalInput from "@/components/GoalInput";
import GoalItem from "@/components/GoalItem";
export interface ICourseGoal {
  enteredText: string;
  id: string;
}

export default function HomeScreen() {
  const [courseGoals, setCourseGoals] = useState<ICourseGoal[]>([]);

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
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
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
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
