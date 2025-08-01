import { StyleSheet, Text, View } from "react-native";

function GameScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Opponent&apos;s Guess</Text>
      {/* GUESS */}
      <View>
        <Text>Higher or lower?</Text>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ddb52f",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#ddb52f",
    padding: 12,
  }
});

export default GameScreen;
