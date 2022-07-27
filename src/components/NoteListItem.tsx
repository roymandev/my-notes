import BaseButton from '@/components/UI/BaseButton';
import { Note } from '@/types/noteTypes';
import { twMerge } from 'tailwind-merge';

interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
}

const NoteListItem = ({ note, isSelected, onClick }: NoteListItemProps) => {
  return (
    <li>
      <BaseButton
        className={twMerge(
          'w-full px-4 py-2 text-left break-all',
          isSelected && 'bg-slate-700 text-slate-300',
        )}
        onClick={onClick}
      >
        {note.title || '(Untitled)'}
      </BaseButton>
    </li>
  );
};

export default NoteListItem;
