import { Note } from '@/types/noteTypes';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// State
export const atomNotes = atomWithStorage<Note[]>('notes', []);

// Actions
export const atomNotesAdd = atom(null, (get, set) => {
  const notes = get(atomNotes);
  const newNote: Note = {
    id: Date.now(),
    title: '',
    body: '',
  };
  set(atomNotes, [...notes, newNote]);
});
