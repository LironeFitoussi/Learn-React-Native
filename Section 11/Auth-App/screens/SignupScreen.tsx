import AuthContent from '../components/Auth/AuthContent';

function SignupScreen() {
  function authenticate(credentials: { email: string; password: string }) {
    console.log('Signup attempt:', credentials);
    // TODO: Implement actual authentication
  }

  return <AuthContent isLogin={false} onAuthenticate={authenticate} />;
}

export default SignupScreen;
