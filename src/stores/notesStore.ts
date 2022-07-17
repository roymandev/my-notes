import { Note } from '@/types/noteTypes';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// State
export const atomNotes = atomWithStorage<Note[]>('notes', []);
export const atomNotesSelected = atom<Note | null>(null);

// Actions

export const atomNotesSelectedWrite = atom(
  null,
  (get, set, updated: Note | null) => {
    set(atomNotesSelected, updated);

    if (updated)
      set(
        atomNotes,
        get(atomNotes).map((note) => (note.id === updated.id ? updated : note)),
      );
  },
);

export const atomNotesAdd = atom(null, (get, set) => {
  const notes = get(atomNotes);
  const newNote: Note = {
    id: Date.now(),
    title: '',
    body: '',
  };
  set(atomNotes, [...notes, newNote]);
});
