import { Note } from '@/types/noteTypes';

export const filterNotes = (notes: Note[], searchQuery: string) =>
  notes.filter((note) =>
    note.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
  );
