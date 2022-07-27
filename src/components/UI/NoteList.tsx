import NoteListItem from '@/components/UI/NoteListItem';
import NoteSearch from '@/components/UI/NoteSearch';
import { filterNotes } from '@/libs/filterNotes';
import { Note } from '@/types/noteTypes';
import { useState } from 'react';

export interface NoteListProps {
  list: Note[];
  selectedId: Note['id'] | null;
  onNoteSelected: (noteId: Note['id']) => void;
}

const NoteList = ({ list, selectedId, onNoteSelected }: NoteListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <NoteSearch query={searchQuery} setQuery={setSearchQuery} />

      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-1">
        {filterNotes(list, searchQuery).map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            isSelected={note.id === selectedId}
            onClick={() => onNoteSelected(note.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default NoteList;
