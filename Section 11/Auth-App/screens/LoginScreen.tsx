import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../util/auth';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useAuth } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useAuth();
  async function loginHandler({ email, password }: { email: string; password: string }) {
    try {
      // console.log('Login attempt:', email, password);
      setIsAuthenticating(true);
      const token = await login(email, password);
      // console.log('Login successful:', token);
      authContext.authenticate(token);
      Alert.alert('Authentication successful', 'You can now use the app.');
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Authentication failed', error.message || 'Could not log in. Please check your credentials.');
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
