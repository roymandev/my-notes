import { db } from '@/App';
import { Note } from '@/types/noteTypes';
import { User } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

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

  return { fetchUserNotes, addNote };
};

export default useDatabase;
