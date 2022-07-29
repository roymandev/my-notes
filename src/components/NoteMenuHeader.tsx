import BaseButton from '@/components/UI/BaseButton';
import useUserNotes from '@/hooks/useUserNotes';
import { RiAddFill } from 'react-icons/ri';

const NoteMenuHeader = () => {
  const { addNote } = useUserNotes();

  return (
    <header className="flex items-center p-2">
      <img src="/My%20Notes.svg" alt="Logo" className="ml-1 h-10 w-10 shadow" />
      <h1 className="px-4 py-2 text-2xl font-bold">My Notes</h1>

      <BaseButton
        className="ml-auto p-2"
        onClick={addNote}
        aria-label="Add Note"
      >
        <RiAddFill className="h-8 w-8" />
      </BaseButton>
    </header>
  );
};

export default NoteMenuHeader;
