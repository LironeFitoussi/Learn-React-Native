import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Screens
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import PlaceDetails from "./screens/PlaceDetails";
import IconButton from "./components/ui/IconButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={{
              title: "All Places",
            }}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={({ navigation }) => ({
              title: "Add New Place",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="save"
                  size={24}
                  color={tintColor || "#fff"}
                  onPress={() => {}}
                />
              ),
            })}
          />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
