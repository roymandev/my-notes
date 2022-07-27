import { Note } from '@/types/noteTypes';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// State
export const atomNotes = atomWithStorage<Note[]>('notes', []);
export const atomNotesSelectedId = atom<string | null>(null);
export const atomNotesSearch = atom('');

export const atomNotesRef = atomWithStorage<Record<string, string>>(
  'notesRef',
  {},
);

// Getter
export const atomNotesSelected = atom((get) =>
  get(atomNotes).find((note) => note.id === get(atomNotesSelectedId)),
);

export const atomNotesFiltered = atom((get) => {
  const notes = get(atomNotes);
  const search = get(atomNotesSearch).toLocaleLowerCase();
  if (search.length < 1) return notes;
  return notes.filter((note) =>
    note.title.toLocaleLowerCase().includes(search),
  );
});

// Actions
export const atomNotesRefAdd = atom(
  null,
  (get, set, newRef: Record<string, string>) => {
    set(atomNotesRef, (prevRef) => ({ ...prevRef, ...newRef }));
  },
);
