import { View, Text, StyleSheet } from "react-native";
import React from "react";

function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your favorite meals will appear here!</Text>
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3f2f25",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
