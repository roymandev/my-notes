import { BaseNote, Note } from '@/types/noteTypes';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// State
export const atomNotes = atomWithStorage<Note[]>('notes', []);
export const atomNotesSelected = atom<Note | null>(null);

// Actions

export const atomNotesSelectedWrite = atom(
  null,
  (get, set, updated: BaseNote | null) => {
    const selectedNote = get(atomNotesSelected);

    if (selectedNote && updated) {
      const updateNote = {
        id: selectedNote.id,
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
    set(atomNotesSelected, get(atomNotes)[0] ?? null);
  }
});

export const atomNotesAdd = atom(null, (get, set) => {
  const notes = get(atomNotes);
  const newNote: Note = {
    id: Date.now(),
    title: '',
    body: '',
    updatedAt: new Date().toISOString(),
  };
  set(atomNotes, [...notes, newNote]);
});
