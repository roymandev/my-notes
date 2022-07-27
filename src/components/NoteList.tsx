import NoteListItem from '@/components/NoteListItem';
import useUserNotes from '@/hooks/useUserNotes';
import { filterNotes } from '@/libs/filterNotes';
import { atomNotes, atomNotesSelectedId } from '@/stores/notesStore';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import NoteSearch from './NoteSearch';

const NoteList = () => {
  const notes = useAtomValue(atomNotes);
  const { fetchNotes } = useUserNotes();
  const [selectedNoteId, setSelectedNoteId] = useAtom(atomNotesSelectedId);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      await fetchNotes();
    })();
  }, []);

  return (
    <>
      <NoteSearch query={searchQuery} setQuery={setSearchQuery} />

      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-1">
        {filterNotes(notes, searchQuery).map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            isSelected={note.id === selectedNoteId}
            onClick={() => setSelectedNoteId(note.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default NoteList;
