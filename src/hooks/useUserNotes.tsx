import { firestore } from '@/lib/firebase';
import { atomNotes, atomNotesSelectedId } from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { BaseNote, Note } from '@/types/noteTypes';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

const useUserNotes = () => {
  const user = useAtomValue(atomUser);
  const setNotes = useSetAtom(atomNotes);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);

  const notesRef = collection(firestore, 'notes');
  const whereIsOwner = where('uid', '==', user?.uid);

  const addNote = useCallback(async () => {
    if (!user) {
      console.error('Unauthorized!');
      return;
    }

    try {
      const newNotes = {
        title: '',
        body: '',
        uid: user.uid,
        updatedAt: new Date().toISOString(),
      };

      // add to firestore
      const noteRef = await addDoc(notesRef, {
        ...newNotes,
        uid: user.uid,
      });

      // add to local notes
      if (noteRef) {
        setNotes((prevNotes) => {
          if (prevNotes.some((note) => note.id === noteRef.id)) {
            return prevNotes;
          }
          return [...prevNotes, { id: noteRef.id, ...newNotes }];
        });

        setSelectedNoteId(noteRef.id);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const fetchNotes = async () => {
    if (!user) {
      setNotes([]);
      setSelectedNoteId(null);

      console.error('Unauthorized!');
      return;
    }

    try {
      const q = query(notesRef, whereIsOwner);
      const querySnapshot = await getDocs(q);

      const notes: Note[] = [];

      querySnapshot.forEach((note) => {
        notes.push({
          id: note.id,
          ...note.data(),
        } as Note);
      });

      setNotes(notes);
    } catch (error) {
      console.error('Firestore: Error, Failed to get user notes.');
    }
  };

  const deleteNote = async (deleteNote: Note) => {
    if (!user || user.uid !== deleteNote.uid) {
      console.error('Unauthorized!');
      return;
    }

    try {
      // Delete from firestore
      const docRef = doc(notesRef, deleteNote.id);
      await deleteDoc(docRef);

      // Delete from local notes
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== deleteNote.id),
      );
      setSelectedNoteId(null);
    } catch (error) {
      console.error('Firestore: ' + (error as Error).message);
    }
  };

  const updateNote = async (updateNote: Partial<BaseNote>, note: Note) => {
    if (!user || user.uid !== note.uid) {
      console.error('Unauthorized!');
      return;
    }

    try {
      // Update local notes
      const update = {
        ...note,
        ...updateNote,
        updatedAt: new Date().toISOString(),
      };

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === update.id ? update : note)),
      );

      const docRef = doc(notesRef, note.id);

      await updateDoc(docRef, update);

      console.info('Firestore: success updating user note ' + docRef.id);
    } catch (error) {
      console.error('Firestore: ' + (error as Error).message);
    }
  };

  return { fetchNotes, addNote, deleteNote, updateNote };
};

export default useUserNotes;
