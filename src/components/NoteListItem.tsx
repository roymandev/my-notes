import BaseButton from '@/components/BaseButton';
import { Note } from '@/types/noteTypes';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
}

const NoteListItem = ({ note, isSelected }: NoteListItemProps) => {
  return (
    <li>
      <Link to={isSelected ? '/note' : note.id}>
        <BaseButton
          className={twMerge(
            'w-full px-4 py-2 text-left break-all',
            isSelected && 'bg-slate-700 text-slate-300',
          )}
        >
          {note.title || '(Untitled)'}
        </BaseButton>
      </Link>
    </li>
  );
};

export default memo(NoteListItem);
