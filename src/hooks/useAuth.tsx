import { auth } from '@/lib/firebase';
import { atomUser } from '@/stores/userStore';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useSetAtom } from 'jotai';

const useAuth = () => {
  const setUser = useSetAtom(atomUser);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  return { login, logout };
};
export default useAuth;
