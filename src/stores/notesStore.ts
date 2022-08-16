import { Note } from '@/types/noteTypes';
import { atom } from 'jotai';

// State
export const atomNotes = atom<Note[]>([]);
export const atomNotesOpened = atom<Note | null>(null);
