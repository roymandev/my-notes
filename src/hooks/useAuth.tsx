import { auth, oAuthProvider } from '@/App';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const logIn = () =>
    signInWithPopup(auth, oAuthProvider).then((result) => {
      navigate('/');
      return result;
    });

  const logOut = () =>
    signOut(auth).then(() => {
      {
        navigate('/login');
      }
    });

  return { logIn, logOut };
};

export default useAuth;
