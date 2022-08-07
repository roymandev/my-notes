import {
  deleteUserNoteById,
  firestore,
  getUserNotes,
  updateUserNote,
} from '@/lib/firebase';
import {
  atomNotes,
  atomNotesRef,
  atomNotesSelectedId,
} from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { BaseNote, Note } from '@/types/noteTypes';
import { addDoc, collection } from 'firebase/firestore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useRef } from 'react';

const useUserNotes = () => {
  const user = useAtomValue(atomUser);
  const setNotes = useSetAtom(atomNotes);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const getNotesRef = useAtomCallback(
    useCallback((get) => get(atomNotesRef), []),
  );
  const timeoutRef = useRef<number>();

  const notesRef = collection(firestore, 'notes');

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
        setNotes((prevNotes) => [
          ...prevNotes,
          { id: noteRef.id, ...newNotes },
        ]);

        setSelectedNoteId(noteRef.id);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const fetchNotes = async () => {
    if (user) {
      const notes = await getUserNotes(user);
      notes && setNotes(notes);

      return;
    }

    setNotes([]);
    console.error('Unauthorized!');
  };

  const deleteNote = async (deleteNote: Note) => {
    if (user && user.uid === deleteNote.uid) {
      // Delete from local notes
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== deleteNote.id),
      );
      setSelectedNoteId(null);

      // Delete from firestore
      const noteId = (await getNotesRef())[deleteNote.id] || deleteNote.id;
      deleteUserNoteById(noteId);

      return;
    }

    console.error('Unauthorized!');
  };

  const updateNote = async (updateNote: Partial<BaseNote>, note: Note) => {
    if (user && user.uid === note.uid) {
      // Update local notes
      const update = {
        ...note,
        ...updateNote,
        updatedAt: new Date().toISOString(),
      };

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === update.id ? update : note)),
      );

      // Update from firestore with delay
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(async () => {
        const noteId = (await getNotesRef())[note.id] || note.id;

        updateUserNote(updateNote, noteId);
      }, 4000);

      return;
    }

    console.error('Unauthorized!');
  };

  return { fetchNotes, addNote, deleteNote, updateNote };
};

export default useUserNotes;
