import NoteListItem from '@/components/NoteListItem';
import useUserNotes from '@/hooks/useUserNotes';
import { atomNotesFiltered, atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

const NoteList = () => {
  const notes = useAtomValue(atomNotesFiltered);
  const selectedNoteId = useAtomValue(atomNotesSelectedId);

  const { fetchNotes } = useUserNotes();

  useEffect(() => {
    (async () => {
      await fetchNotes();
    })();
  }, []);

  return (
    <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-1">
      {notes.map((note) => (
        <NoteListItem
          key={note.id}
          note={note}
          isSelected={note.id === selectedNoteId}
        />
      ))}
    </ul>
  );
};

export default NoteList;
