import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import { RootStackParamList } from "./screens/CategoriesScreen";

// Context
import FavoritesContextProvider from "./store/context/favorites-context";

// Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Drawer Navigator
import DrawerNavigator from "./DrawerNavigator";

export default function App() {
  return (
    <FavoritesContextProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MealsCategories"
          screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: '#fff',
            contentStyle: { backgroundColor: '#3f2f25' }
          }}
        >
          <Stack.Screen 
            name="MealsCategories" 
            component={DrawerNavigator} 
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="MealsOverview" 
            component={MealsOverviewScreen}
          />
          <Stack.Screen 
            name="MealDetails" 
            component={MealDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesContextProvider>
  );
}

