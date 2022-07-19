import { atomUser } from '@/stores/userStore';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const user = useAtomValue(atomUser);

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
