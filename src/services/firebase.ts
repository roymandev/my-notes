import { firebaseConfig } from '@/config/firebase';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
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
const notesRef = collection(db, 'notes');
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

    console.info('Firestore: Success get user notes');

    return result;
  } catch (error) {
    console.error('Firestore: Error, Failed to get user notes.');
  }
};

export const addUserNote = async (note: Omit<Note, 'id'>, user: User) => {
  try {
    const docRef = await addDoc(notesRef, {
      ...note,
      uid: user.uid,
    });

    console.info('Firestore: success add user note ' + docRef.id);

    return { ...note, id: docRef.id };
  } catch (error) {
    console.error('Firestore: failed add new note');
  }
};
