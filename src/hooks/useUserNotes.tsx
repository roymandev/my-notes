import {
  addUserNote,
  deleteUserNoteById,
  getUserNotes,
  updateUserNote,
} from '@/lib/firebase';
import {
  atomNotes,
  atomNotesRef,
  atomNotesRefAdd,
  atomNotesSelectedId,
} from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { BaseNote, Note } from '@/types/noteTypes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { nanoid } from 'nanoid';
import { useCallback, useRef } from 'react';

const useUserNotes = () => {
  const user = useAtomValue(atomUser);
  const setNotes = useSetAtom(atomNotes);
  const addNewNoteRef = useSetAtom(atomNotesRefAdd);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const getNotesRef = useAtomCallback(
    useCallback((get) => get(atomNotesRef), []),
  );
  const timeoutRef = useRef<number>();

  const fetchNotes = async () => {
    if (user) {
      const notes = await getUserNotes(user);
      notes && setNotes(notes);

      return;
    }

    setNotes([]);
    console.error('Unauthorized!');
  };

  const addNote = useCallback(async () => {
    if (user) {
      const localId = nanoid();
      const newNotes = {
        title: '',
        body: '',
        uid: user.uid,
        updatedAt: new Date().toISOString(),
      };

      // Add to local notes
      const localNote = { id: localId, ...newNotes };
      setNotes((prevNotes) => [...prevNotes, localNote]);
      setSelectedNoteId(localNote.id);

      // add to firestore
      const storedNote = await addUserNote(newNotes, user);

      // add new notesRef
      if (storedNote) addNewNoteRef({ [localId]: storedNote.id });

      return;
    }

    console.error('Unauthorized!');
  }, [user]);

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
