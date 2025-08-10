import { StatusBar } from "expo-status-bar";
import AuthContextProvider from "./store/auth-context";
import AppNavigator from "./navigation/AppNavigator";
import AppBootstrap from "./components/AppBootstrap";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <AppBootstrap>
          <AppNavigator />
        </AppBootstrap>
      </AuthContextProvider>
    </>
  );
}
