import { Button, StatusBar } from "react-native";
import CategoriesScreen, { RootStackParamList } from "./screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import { Text } from "react-native";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MealsCategories"
          screenOptions={{
            contentStyle: { backgroundColor: '#3f2f25' },
            headerStyle: {
              backgroundColor: '#351401'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="MealsCategories" 
            component={CategoriesScreen} 
            options={{
              title: 'All Categories',
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

