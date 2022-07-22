import BaseButton from '@/components/BaseButton';
import useUserNotes from '@/hooks/useUserNotes';

const NoteViewerBlank = () => {
  const { addNote } = useUserNotes();

  return (
    <div className="flex flex-1 flex-col place-items-center justify-center space-y-5 text-center text-3xl">
      <p>Select notes or</p>
      <BaseButton variant="primary" className="py-2 px-5" onClick={addNote}>
        Add New Notes
      </BaseButton>
    </div>
  );
};

export default NoteViewerBlank;
