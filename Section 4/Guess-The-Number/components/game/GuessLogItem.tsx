import Colors from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function GuessLogItem({ roundNumber, guess }: { roundNumber: number, guess: number }) {
  return (
    <View style={styles.listItem}>
      <Text>#{roundNumber}</Text>
      <Text>Opponent&apos;s Guess: {guess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
  },
});