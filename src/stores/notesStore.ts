import { Note } from '@/types/noteTypes';
import { atom } from 'jotai';

// State
export const atomNotes = atom<Note[]>([]);
export const atomNotesSelectedId = atom<string | null>(null);

export const atomNotesRef = atom<Record<string, string>>({});

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
