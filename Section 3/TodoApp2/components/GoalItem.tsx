import { Pressable, StyleSheet, Text, View } from "react-native";

import { ICourseGoal } from "@/app/_layout";

interface GoalItemProps {
  goal: ICourseGoal;
  goalId: string;
  onDeleteItem: (id: string) => void;
}

export default function GoalItem({
  goal,
  onDeleteItem,
  goalId,
}: GoalItemProps) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#5e4acc" }}
        onPress={() => onDeleteItem(goal.id)}
        style={({pressed}) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{goal.enteredText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5
  },
  goalText: {
    padding: 8,
    color: "white",
  },
});
