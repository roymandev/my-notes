import { Note } from '@/types/noteTypes';
import { atom } from 'jotai';

// State
export const atomNotes = atom<Note[]>([]);
export const atomNotesSelectedId = atom<string | null>(null);

// Getter
export const atomNotesSelected = atom<Note | null>(
  (get) =>
    get(atomNotes).find((note) => note.id === get(atomNotesSelectedId)) || null,
);

// Setter
export const atomNotesUpdateNote = atom(null, (get, set, updateNote: Note) => {
  const notes = get(atomNotes);

  if (notes.find((note) => note.id === updateNote.id)) {
    set(
      atomNotes,
      notes.map((note) =>
        note.id === updateNote.id ? { ...note, ...updateNote } : note,
      ),
    );
  } else {
    set(atomNotes, [...notes, updateNote]);
  }
});
