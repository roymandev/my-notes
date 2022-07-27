import BaseButton from '@/components/BaseButton';
import { atomNotesSelectedId } from '@/stores/notesStore';
import { Note } from '@/types/noteTypes';
import { useSetAtom } from 'jotai';
import { twMerge } from 'tailwind-merge';

interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
}

const NoteListItem = ({ note, isSelected }: NoteListItemProps) => {
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);

  return (
    <li>
      <BaseButton
        className={twMerge(
          'w-full px-4 py-2 text-left break-all',
          isSelected && 'bg-slate-700 text-slate-300',
        )}
        onClick={() => setSelectedNoteId(note.id)}
      >
        {note.title || '(Untitled)'}
      </BaseButton>
    </li>
  );
};

export default NoteListItem;
