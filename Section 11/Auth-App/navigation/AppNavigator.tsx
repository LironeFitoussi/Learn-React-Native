import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../store/auth-context";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";

export default function AppNavigator() {
  const authContext = useAuth();
  return (
    <NavigationContainer>
      {authContext.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


