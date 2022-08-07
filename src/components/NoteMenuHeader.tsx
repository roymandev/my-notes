import BaseButton from '@/components/BaseButton';
import useUserNotes from '@/hooks/useUserNotes';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { RiAddFill } from 'react-icons/ri';

const NoteMenuHeader = () => {
  const [loading, setLoading] = useState(false);
  const { addNote } = useUserNotes();

  const addNoteHanlder = async () => {
    setLoading(true);
    await addNote();
    setLoading(false);
  };

  return (
    <header className="flex items-center p-2">
      <img src="/My%20Notes.svg" alt="Logo" className="ml-1 h-10 w-10 shadow" />
      <h1 className="px-4 py-2 text-2xl font-bold">My Notes</h1>

      <BaseButton
        className="ml-auto p-2"
        onClick={addNoteHanlder}
        aria-label="Add Note"
        disabled={loading}
      >
        {loading ? (
          <CgSpinner className="h-8 w-8 animate-spin" />
        ) : (
          <RiAddFill className="h-8 w-8" />
        )}
      </BaseButton>
    </header>
  );
};

export default NoteMenuHeader;
