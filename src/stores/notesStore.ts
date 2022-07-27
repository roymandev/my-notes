import { Note } from '@/types/noteTypes';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// State
export const atomNotes = atomWithStorage<Note[]>('notes', []);
export const atomNotesSelectedId = atom<string | null>(null);

export const atomNotesRef = atomWithStorage<Record<string, string>>(
  'notesRef',
  {},
);

// Getter
export const atomNotesSelected = atom((get) =>
  get(atomNotes).find((note) => note.id === get(atomNotesSelectedId)),
);

// Actions
export const atomNotesRefAdd = atom(
  null,
  (get, set, newRef: Record<string, string>) => {
    set(atomNotesRef, (prevRef) => ({ ...prevRef, ...newRef }));
  },
);
