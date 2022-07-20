import { db } from '@/App';
import { atomUser } from '@/stores/userStore';
import { Note } from '@/types/noteTypes';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useAtomValue } from 'jotai';

const useDatabase = () => {
  const notesRef = collection(db, 'notes') as CollectionReference<Note>;
  const user = useAtomValue(atomUser);

  const whereIsOwner = where('uid', '==', user?.uid || 'NOT_OWNER');

  const fetchUserNotes = async () => {
    const userNotesQuery = query(notesRef, whereIsOwner);

    const userNotesSnap = await getDocs(userNotesQuery);

    const result: Note[] = [];

    userNotesSnap.forEach((note) => {
      result.push({
        ...note.data(),
      } as Note);
    });

    return result;
  };

  const addNote = async (newNotes: Omit<Note, 'id'>) => {
    const docRef = await addDoc(notesRef, newNotes);
    return { ...newNotes, id: docRef.id } as Note;
  };

  const deleteNote = async (noteId: string) => {
    await deleteDoc(doc(notesRef, noteId));
  };

  const editNote = async (noteId: string, update: Note) => {
    await updateDoc(doc(notesRef, noteId), update);
  };

  return { fetchUserNotes, addNote, deleteNote, editNote };
};

export default useDatabase;
