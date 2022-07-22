import { firebaseConfig } from '@/config/firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const oAuthProvider = new GoogleAuthProvider();

export const login = () => signInWithPopup(auth, oAuthProvider);

export const logout = () => signOut(auth);
