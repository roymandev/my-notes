import { firestore } from '@/lib/firebase';
import {
  atomNotes,
  atomNotesSelectedId,
  atomNotesUpdateNote,
} from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { BaseNote, Note } from '@/types/noteTypes';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useUserNotes = () => {
  const navigate = useNavigate();

  const user = useAtomValue(atomUser);
  const setNotes = useSetAtom(atomNotes);
  const updateLocalNote = useSetAtom(atomNotesUpdateNote);
  const setNoteSelectedId = useSetAtom(atomNotesSelectedId);

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

        setNoteSelectedId(noteRef.id);
        navigate('/note/' + noteRef.id);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const fetchNotes = async () => {
    if (!user) {
      setNotes([]);
      setNoteSelectedId(null);

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

  const fetchNoteById = async (noteId: string) => {
    try {
      const docRef = doc(notesRef, noteId);
      const docSnap = await getDoc(docRef);

      updateLocalNote({ id: noteId, ...docSnap.data() } as Note);
    } catch (e) {
      console.error(e);
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
      setNoteSelectedId(null);
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

  return {
    fetchNotes,
    fetchNoteById,
    addNote,
    deleteNote,
    updateNote,
  };
};

export default useUserNotes;
