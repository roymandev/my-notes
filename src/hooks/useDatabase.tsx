import { db } from '@/App';
import { Note } from '@/types/noteTypes';
import { addDoc, collection } from 'firebase/firestore';

const useDatabase = () => {
  const addNote = async (newNotes: Omit<Note, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'notes'), newNotes);

      return { ...newNotes, id: docRef.id } as Note;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return { addNote };
};

export default useDatabase;
