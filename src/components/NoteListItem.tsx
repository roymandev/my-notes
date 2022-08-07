import BaseButton from '@/components/BaseButton';
import { Note } from '@/types/noteTypes';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
  onSelect: (selectedId: NoteListItemProps['note']['id'] | null) => void;
}

const NoteListItem = ({ note, isSelected, onSelect }: NoteListItemProps) => {
  return (
    <li>
      <BaseButton
        className={twMerge(
          'w-full px-4 py-2 text-left break-all',
          isSelected && 'bg-slate-700 text-slate-300',
        )}
        onClick={() => (isSelected ? onSelect(null) : onSelect(note.id))}
      >
        {note.title || '(Untitled)'}
      </BaseButton>
    </li>
  );
};

export default memo(NoteListItem);
