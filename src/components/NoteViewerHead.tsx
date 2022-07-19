import BaseButton from '@/components/BaseButton';
import {
  atomNotesDeleteSelected,
  atomNotesSelected,
} from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { RiArrowLeftSLine, RiDeleteBin2Line } from 'react-icons/ri';
import { formatDate } from '@/utils/formatDate';

const NoteViewerHead = () => {
  const selectedNote = useAtomValue(atomNotesSelected);
  const deleteSelectedNoteHanlder = useSetAtom(atomNotesDeleteSelected);
  const setSelectedNote = useSetAtom(atomNotesSelected);

  return (
    <header className="flex items-center p-1">
      <BaseButton
        className="p-2 sm:hidden"
        onClick={() => setSelectedNote(null)}
      >
        <RiArrowLeftSLine className="h-5 w-5" />
      </BaseButton>

      <p className="flex-1 px-2 text-center sm:text-left">
        <span className="text-slate-400">Updated at:</span>{' '}
        {selectedNote && formatDate(selectedNote.updatedAt)}
      </p>

      <BaseButton
        className="ml-auto p-2 text-rose-500/70 hover:text-rose-500"
        onClick={deleteSelectedNoteHanlder}
      >
        <RiDeleteBin2Line className="h-5 w-5" />
      </BaseButton>
    </header>
  );
};

export default NoteViewerHead;
