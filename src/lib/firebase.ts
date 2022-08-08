import { firebaseConfig } from '@/config/firebase';
import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { BaseNote } from '@/types/noteTypes';

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// Firestore
const notesRef = collection(firestore, 'notes');

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
