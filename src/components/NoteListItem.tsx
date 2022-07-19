import BaseButton from '@/components/BaseButton';
import { atomNotesSelected } from '@/stores/notesStore';
import { Note } from '@/types/noteTypes';
import { useSetAtom } from 'jotai';
import { twMerge } from 'tailwind-merge';

interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
}

const NoteListItem = ({ note, isSelected }: NoteListItemProps) => {
  const selectNote = useSetAtom(atomNotesSelected);

  const selectNoteHandler = () => selectNote(note);

  return (
    <li>
      <BaseButton
        className={twMerge(
          'w-full px-4 py-2 text-left break-all',
          isSelected && 'bg-slate-700 text-slate-300',
        )}
        onClick={selectNoteHandler}
      >
        {note.title || '(Untitled)'}
      </BaseButton>
    </li>
  );
};

export default NoteListItem;
