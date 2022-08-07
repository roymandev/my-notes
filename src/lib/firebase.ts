import { firebaseConfig } from '@/config/firebase';
import { initializeApp } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import { BaseNote, Note } from '@/types/noteTypes';

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// Firestore
const notesRef = collection(firestore, 'notes');
const whereIsOwner = (user: User) => where('uid', '==', user.uid);

export const getUserNotes = async (user: User) => {
  try {
    const q = query(notesRef, whereIsOwner(user));
    const querySnapshot = await getDocs(q);

    const result: Note[] = [];

    querySnapshot.forEach((note) => {
      result.push({
        id: note.id,
        ...note.data(),
      } as Note);
    });

    console.info('Firestore: Success get user notes');

    return result;
  } catch (error) {
    console.error('Firestore: Error, Failed to get user notes.');
  }
};

export const deleteUserNoteById = async (noteId: string) => {
  try {
    const docRef = doc(notesRef, noteId);

    await deleteDoc(docRef);

    console.info('Firestore: success delete user note ' + docRef.id);
  } catch (error) {
    console.error('Firestore: ' + (error as Error).message);
  }
};

export const updateUserNote = async (
  updateNote: Partial<BaseNote>,
  noteId: string,
) => {
  try {
    const docRef = doc(notesRef, noteId);

    await updateDoc(docRef, updateNote);

    console.info('Firestore: success updating user note ' + docRef.id);
  } catch (error) {
    console.error('Firestore: ' + (error as Error).message);
  }
};
