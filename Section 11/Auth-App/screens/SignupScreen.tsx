import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAuth } from "../store/auth-context";

type Credentials = {
  email: string;
  password: string;
};

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useAuth();

  async function signupHandler({ email, password }: Credentials) {
    try {
      // console.log("signupHandler", email, password);
      setIsAuthenticating(true);
      const token = await createUser(email, password);
      // console.log("User created successfully:", token);
      setIsAuthenticating(false);
      authContext.authenticate(token);
      // You can navigate to the next screen or show success message here
      Alert.alert(
        "Success!",
        "User account created successfully.",
        [{ text: "OK" }]
      );
    } catch (error: any) {
      console.error("Signup error:", error);
      setIsAuthenticating(false);
      
      Alert.alert(
        "Authentication failed",
        error.message || "Could not create user, please try again later."
      );
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
