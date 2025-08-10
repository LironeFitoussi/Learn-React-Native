import AuthContent from '../components/Auth/AuthContent';

function LoginScreen() {
  function authenticate(credentials: { email: string; password: string }) {
    console.log('Login attempt:', credentials);
    // TODO: Implement actual authentication
  }

  return <AuthContent isLogin onAuthenticate={authenticate} />;
}

export default LoginScreen;
