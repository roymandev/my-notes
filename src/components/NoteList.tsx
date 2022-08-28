import NoteListItem from '@/components/NoteListItem';
import NoteSearch from '@/components/NoteSearch';
import { filterNotes } from '@/lib/filterNotes';
import { atomNotes, atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

const NoteList = () => {
  const notes = useAtomValue(atomNotes);
  const selectedNoteId = useAtomValue(atomNotesSelectedId);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <NoteSearch query={searchQuery} setQuery={setSearchQuery} />

      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-1">
        {filterNotes(notes, searchQuery).map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            isSelected={note.id === selectedNoteId}
          />
        ))}
      </ul>
    </>
  );
};

export default NoteList;
