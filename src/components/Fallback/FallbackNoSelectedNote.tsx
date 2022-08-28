import BaseButton from '@/components/BaseButton';
import useUserNotes from '@/hooks/useUserNotes';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

const FallbackNoSelectedNote = () => {
  const [loading, setLoading] = useState(false);
  const { addNote } = useUserNotes();

  const addNoteHanlder = async () => {
    setLoading(true);
    await addNote();
    setLoading(false);
  };

  return (
    <div className="flex h-full flex-1 flex-col place-items-center justify-center space-y-5 text-center text-3xl">
      {loading ? (
        <CgSpinner className="h-20 w-20 animate-spin text-slate-500" />
      ) : (
        <>
          <p>Select notes or</p>
          <BaseButton
            variant="primary"
            className="py-2 px-5"
            onClick={addNoteHanlder}
          >
            Add New Notes
          </BaseButton>
        </>
      )}
    </div>
  );
};

export default FallbackNoSelectedNote;
