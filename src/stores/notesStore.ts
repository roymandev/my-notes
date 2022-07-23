import { BaseNote, Note } from '@/types/noteTypes';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// State
export const atomNotes = atomWithStorage<Note[]>('notes', []);
export const atomNotesSelected = atom<Note | null>(null);
export const atomNotesSearch = atom('');

export const atomNotesRef = atomWithStorage<Record<string, string>>(
  'notesRef',
  {},
);

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

export const atomNotesRefAdd = atom(
  null,
  (get, set, newRef: Record<string, string>) => {
    set(atomNotesRef, (prevRef) => ({ ...prevRef, ...newRef }));
  },
);
