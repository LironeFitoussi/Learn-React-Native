import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet } from "react-native";

// Screens 
import GameScreen from "./screens/Game.screen";
import StartGameScreen from "./screens/StartGame.screen";

export default function App() {
  const [userNumber, setUserNumber] = useState(0);

  function startGameHandler(number: number) {
    setUserNumber(number);
  }

  let screen = <StartGameScreen onStartGame={startGameHandler}/>;
  if (userNumber) {
    screen = <GameScreen />;
  }
  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("./assets/images/background.png")}
        style={styles.rootScreen}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
