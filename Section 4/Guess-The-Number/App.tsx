import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Colors from "./constants/colors";
// Screens 
import GameScreen from "./screens/Game.screen";
import GameOverScreen from "./screens/GameOver.screen";
import StartGameScreen from "./screens/StartGame.screen";

export default function App() {
  const [userNumber, setUserNumber] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);
  
  function startGameHandler(number: number) {
    setUserNumber(number);
    setGameIsOver(false);
  }

  let screen = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={() => setGameIsOver(true)} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }

  return (
    <LinearGradient colors={[Colors.primary800, Colors.accent500]} style={styles.rootScreen}>
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
