import { db } from '@/App';
import { Note } from '@/types/noteTypes';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

const useDatabase = () => {
  const notesRef = collection(db, 'notes');

  const fetchUserNotes = async (user: User) => {
    const q = query(notesRef, where('uid', '==', user.uid));

    const querySnapshot = await getDocs(q);

    const result: Note[] = [];

    querySnapshot.forEach((note) => {
      result.push({
        id: note.id,
        ...note.data(),
      } as Note);
    });

    return result;
  };

  const addNote = async (newNotes: Omit<Note, 'id'>) => {
    try {
      const docRef = await addDoc(notesRef, newNotes);

      return { ...newNotes, id: docRef.id } as Note;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const deleteNote = async (noteId: string) => {
    await deleteDoc(doc(db, 'notes', noteId));
  };

  const editNote = async (noteId: string, update: Note) => {
    await setDoc(doc(db, 'notes', noteId), update);
  };

  return { fetchUserNotes, addNote, deleteNote, editNote };
};

export default useDatabase;
