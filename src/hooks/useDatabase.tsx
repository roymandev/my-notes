import { db } from '@/App';
import { atomUser } from '@/stores/userStore';
import { Note } from '@/types/noteTypes';
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
import { useAtomValue } from 'jotai';

const useDatabase = () => {
  const notesRef = collection(db, 'notes');
  const user = useAtomValue(atomUser);

  const fetchUserNotes = async () => {
    const result: Note[] = [];

    if (user) {
      const q = query(notesRef, where('uid', '==', user.uid));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((note) => {
        result.push({
          id: note.id,
          ...note.data(),
        } as Note);
      });
    }

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
