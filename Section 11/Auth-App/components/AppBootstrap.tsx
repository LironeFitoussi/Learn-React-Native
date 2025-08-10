import { ReactNode } from 'react';
import { useAuth } from '../store/auth-context';
import LoadingOverlay from './ui/LoadingOverlay';

type AppBootstrapProps = {
  children: ReactNode;
};

export default function AppBootstrap({ children }: AppBootstrapProps) {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return <LoadingOverlay message="Checking login status..." />;
  }

  return <>{children}</>;
}


