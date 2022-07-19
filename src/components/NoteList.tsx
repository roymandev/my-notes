import NoteListItem from '@/components/NoteListItem';
import { atomNotesFiltered, atomNotesSelected } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';

const NoteList = () => {
  const notes = useAtomValue(atomNotesFiltered);
  const selectedNotes = useAtomValue(atomNotesSelected);

  return (
    <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-1">
      {notes.map((note) => (
        <NoteListItem
          key={note.id}
          note={note}
          isSelected={note.id === selectedNotes?.id}
        />
      ))}
    </ul>
  );
};

export default NoteList;
