import {
  addUserNote,
  deleteUserNoteById,
  getUserNotes,
} from '@/services/firebase';
import {
  atomNotes,
  atomNotesRef,
  atomNotesRefAdd,
  atomNotesSelected,
} from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { Note } from '@/types/noteTypes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';

const useUserNotes = () => {
  const user = useAtomValue(atomUser);
  const setNotes = useSetAtom(atomNotes);
  const addNewNoteRef = useSetAtom(atomNotesRefAdd);
  const setSelectedNotes = useSetAtom(atomNotesSelected);
  const getNotesRef = useAtomCallback(
    useCallback((get) => get(atomNotesRef), []),
  );

  const fetchNotes = async () => {
    if (user) {
      const notes = await getUserNotes(user);
      notes && setNotes(notes);

      return;
    }

    setNotes([]);
    console.error('Unauthorized!');
  };

  const addNote = async () => {
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
      setSelectedNotes(localNote);

      // add to firestore
      const storedNote = await addUserNote(newNotes, user);

      // add new notesRef
      if (storedNote) addNewNoteRef({ [localId]: storedNote.id });

      return;
    }

    console.error('Unauthorized!');
  };

  const deleteNote = async (deleteNote: Note) => {
    if (user && user.uid === deleteNote.uid) {
      // Delete from local notes
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== deleteNote.id),
      );
      setSelectedNotes(null);

      // Delete from firestore
      const noteId = (await getNotesRef())[deleteNote.id] || deleteNote.id;
      deleteUserNoteById(noteId);

      return;
    }

    console.error('Unauthorized!');
  };

  return { fetchNotes, addNote, deleteNote };
};

export default useUserNotes;
