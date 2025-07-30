import { StyleSheet, Text, View } from "react-native";

import { ICourseGoal } from "@/app/_layout";

interface GoalItemProps {
  goal: ICourseGoal;
}

export default function GoalItem({ goal }: GoalItemProps) {
    return (
        <View style={styles.goalItem}>
            <Text style={styles.goalText}>{goal.enteredGoal}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: "#5e0acc",
    },
    goalText: {
        color: "white",
    }
});