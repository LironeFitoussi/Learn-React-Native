import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../constants/styles";
import WelcomeScreen from "../screens/WelcomeScreen";
import IconButton from "../components/ui/IconButton";
import { useAuth } from "../store/auth-context";

const Stack = createNativeStackNavigator();

export default function AuthenticatedStack() {
  const authContext = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon="exit"
              size={24}
              color={Colors.primary100}
              onPress={authContext.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}


