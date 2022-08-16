import NoteListItem from '@/components/NoteListItem';
import NoteSearch from '@/components/NoteSearch';
import useUserNotes from '@/hooks/useUserNotes';
import { filterNotes } from '@/lib/filterNotes';
import { atomNotes, atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

const NoteList = () => {
  const notes = useAtomValue(atomNotes);
  const selectedNoteId = useAtomValue(atomNotesSelectedId);
  const [searchQuery, setSearchQuery] = useState('');
  const { fetchNotes } = useUserNotes();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchNotes().then(() => setLoading(false));
  }, []);

  return (
    <>
      <NoteSearch query={searchQuery} setQuery={setSearchQuery} />

      {loading && (
        <div className="flex items-center justify-center gap-2 p-1 text-sm text-sky-500">
          <CgSpinner className="h-4 w-4 animate-spin" /> Fetching notes
        </div>
      )}

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
