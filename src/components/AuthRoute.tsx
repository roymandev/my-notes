import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthRouteProps {
  children?: React.ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
    } else {
      console.log("Unauthorized, you can't access this page.");
      navigate('/login');
    }
  });

  useEffect(() => {
    AuthCheck();

    return () => AuthCheck();
  }, [auth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default AuthRoute;
