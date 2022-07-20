import useDatabase from '@/hooks/useDatabase';
import { atomUser } from '@/stores/userStore';
import { BaseNote, Note } from '@/types/noteTypes';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { nanoid } from 'nanoid';

// State
export const atomNotes = atomWithStorage<Note[]>('notes', []);
export const atomNotesSelected = atom<Note | null>(null);
export const atomNotesSearch = atom('');

// Actions
export const atomNotesFiltered = atom((get) => {
  const notes = get(atomNotes);
  const search = get(atomNotesSearch).toLocaleLowerCase();
  if (search.length < 1) return notes;
  return notes.filter((note) =>
    note.title.toLocaleLowerCase().includes(search),
  );
});

export const atomNotesSelectedWrite = atom(
  null,
  (get, set, updated: Partial<BaseNote> | null) => {
    const selectedNote = get(atomNotesSelected);

    if (selectedNote && updated) {
      const updateNote = {
        ...selectedNote,
        ...updated,
        updatedAt: new Date().toISOString(),
      };
      set(atomNotesSelected, updateNote);

      set(
        atomNotes,
        get(atomNotes).map((note) =>
          note.id === updateNote.id ? updateNote : note,
        ),
      );
    }
  },
);

export const atomNotesDeleteSelected = atom(null, (get, set) => {
  const selectedNote = get(atomNotesSelected);
  if (selectedNote) {
    set(
      atomNotes,
      get(atomNotes).filter((note) => note.id !== selectedNote.id),
    );
    set(atomNotesSelected, null);
  }
});

export const atomNotesAdd = atom(null, (get, set) => {
  const { addNote } = useDatabase();

  const user = get(atomUser);

  if (user?.uid) {
    const newNote = {
      title: '',
      body: '',
      uid: user.uid,
      updatedAt: new Date().toISOString(),
    };

    // Add new local notes
    const localId = nanoid();
    const newLocalNotes = { ...newNote, id: localId };
    set(atomNotes, [...get(atomNotes), newLocalNotes]);
    set(atomNotesSelected, newLocalNotes);

    // Add new notes to database and replace local notes id with database id
    addNote(newNote).then((result) => {
      if (result) {
        set(
          atomNotes,
          get(atomNotes).map((note) =>
            note.id === localId ? { ...note, id: result.id } : note,
          ),
        );

        if (get(atomNotesSelected)?.id === localId)
          set(atomNotesSelected, result);
      }
    });
  }
});
