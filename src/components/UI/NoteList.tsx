import NoteListItem from '@/components/UI/NoteListItem';
import NoteSearch from '@/components/UI/NoteSearch';
import { filterNotes } from '@/libs/filterNotes';
import { Note } from '@/types/noteTypes';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

export interface NoteListProps {
  list: Note[];
  selectedId: Note['id'] | null;
  onNoteSelected: (noteId: NoteListProps['selectedId']) => void;
  isFetching: boolean;
}

const NoteList = ({
  list,
  selectedId,
  onNoteSelected,
  isFetching,
}: NoteListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <NoteSearch query={searchQuery} setQuery={setSearchQuery} />

      {isFetching && (
        <div className="flex items-center justify-center gap-2 p-1 text-sm text-sky-500">
          <CgSpinner className="h-4 w-4 animate-spin" /> Fetching notes
        </div>
      )}

      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-1">
        {filterNotes(list, searchQuery).map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            isSelected={note.id === selectedId}
            onSelect={onNoteSelected}
          />
        ))}
      </ul>
    </>
  );
};

export default NoteList;
