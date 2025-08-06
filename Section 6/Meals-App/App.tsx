import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import CategoriesScreen, { RootStackParamList } from "./screens/CategoriesScreen";

// Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Drawer Navigator
import DrawerNavigator from "./DrawerNavigator";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
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
              headerShown: false, // Hide the header for the drawer navigator
            }}
          />
          <Stack.Screen 
            name="MealsOverview" 
            component={MealsOverviewScreen}
            // options={({ route, navigation}) => {
            //   const categoryId = route.params.categoryId;
            //   return {
            //     title: categoryId,
            //   }
            // }}
          />
          <Stack.Screen 
            name="MealDetails" 
            component={MealDetailsScreen}
            // options={{
            //   headerRight: () => {
            //     // return <Text>the header</Text>
            //     return <Button title="Tap Me" onPress={() => {}}/>
            //   }
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

