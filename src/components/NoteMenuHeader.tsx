import BaseButton from '@/components/BaseButton';
import { memo } from 'react';
import { RiAddFill } from 'react-icons/ri';

export interface NoteMenuHeaderProps {
  onAddNote: () => void;
}

const NoteMenuHeader = ({ onAddNote }: NoteMenuHeaderProps) => {
  return (
    <header className="flex items-center p-2">
      <img src="/My%20Notes.svg" alt="Logo" className="ml-1 h-10 w-10 shadow" />
      <h1 className="px-4 py-2 text-2xl font-bold">My Notes</h1>

      <BaseButton
        className="ml-auto p-2"
        onClick={onAddNote}
        aria-label="Add Note"
      >
        <RiAddFill className="h-8 w-8" />
      </BaseButton>
    </header>
  );
};

export default memo(NoteMenuHeader);
