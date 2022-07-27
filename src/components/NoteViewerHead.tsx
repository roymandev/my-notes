import BaseButton from '@/components/BaseButton';
import { atomNotesSelected, atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { RiArrowLeftSLine, RiDeleteBin2Line } from 'react-icons/ri';
import { formatDate } from '@/utils/formatDate';
import useUserNotes from '@/hooks/useUserNotes';

const NoteViewerHead = () => {
  const selectedNote = useAtomValue(atomNotesSelected);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const { deleteNote } = useUserNotes();

  const deleteNoteHandler = () => selectedNote && deleteNote(selectedNote);

  return (
    <header className="flex items-center p-2">
      <BaseButton
        className="p-2 md:hidden"
        onClick={() => setSelectedNoteId(null)}
      >
        <RiArrowLeftSLine className="h-8 w-8" />
      </BaseButton>

      <p className="flex-1 px-4 text-center text-base md:text-left md:text-lg">
        <span className="text-slate-400">Updated at:</span>{' '}
        {selectedNote && formatDate(selectedNote.updatedAt)}
      </p>

      <BaseButton
        className="ml-auto p-3 text-rose-500/70 hover:text-rose-500"
        onClick={deleteNoteHandler}
      >
        <RiDeleteBin2Line className="h-6 w-6" />
      </BaseButton>
    </header>
  );
};

export default NoteViewerHead;
