import { StatusBar } from "react-native";
import { GlobalStyles } from "./constants/styles";

// Native Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider, focusManager, onlineManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

// Inner Navigation
import ExpensesOverview from "./ExpensesOverview";
import ManageExpense from "./screens/ManageExpenses";

// Context
import ExpensesContextProvider from "./store/expenses-context";

// Navigation
const Stack = createNativeStackNavigator();

// App
export default function App() {
  const queryClient = new QueryClient();

  // Keep react-query in sync with RN AppState and network
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  return (
    <>
      <StatusBar barStyle="light-content" />
      <QueryClientProvider client={queryClient}>
        <ExpensesContextProvider>
          <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
            >
              <Stack.Screen
                name="ExpensesOverview"
                component={ExpensesOverview}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ManageExpenses"
                component={ManageExpense}
                options={{
                  presentation: "modal",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ExpensesContextProvider>
      </QueryClientProvider>
    </>
  );
}
