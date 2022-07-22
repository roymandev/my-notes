import { firebaseConfig } from '@/config/firebase';
import { initializeApp } from 'firebase/app';
import {
  collection,
  CollectionReference,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { Note } from '@/types/noteTypes';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const oAuthProvider = new GoogleAuthProvider();

// Authentication
export const login = () => signInWithPopup(auth, oAuthProvider);
export const logout = () => signOut(auth);

// Firestore
const notesRef = collection(db, 'notes') as CollectionReference<Note>;
const whereIsOwner = (user: User) => where('uid', '==', user.uid);

export const getUserNotes = async (user: User) => {
  try {
    const q = query(notesRef, whereIsOwner(user));
    const querySnapshot = await getDocs(q);

    const result: Note[] = [];

    querySnapshot.forEach((note) => {
      result.push({
        ...note.data(),
      } as Note);
    });

    console.info('Success get user notes');

    return result;
  } catch (error) {
    console.error('Firebase Error, Failed to get user notes.');
  }
};
