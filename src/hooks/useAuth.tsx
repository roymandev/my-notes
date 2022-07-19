import { auth, oAuthProvider } from '@/services/firebase';
import { atomUser } from '@/stores/userStore';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const setUser = useSetAtom(atomUser);
  const navigate = useNavigate();

  const logIn = () =>
    signInWithPopup(auth, oAuthProvider).then((result) => {
      setUser(result.user);
      navigate('/');
      return result;
    });

  const logOut = () =>
    signOut(auth).then(() => {
      {
        setUser(null);
        navigate('/login');
      }
    });

  return { logIn, logOut };
};

export default useAuth;
