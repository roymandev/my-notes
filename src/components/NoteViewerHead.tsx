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
    <header className="flex items-center p-2">
      <BaseButton
        className="p-2 md:hidden"
        onClick={() => setSelectedNote(null)}
      >
        <RiArrowLeftSLine className="h-8 w-8" />
      </BaseButton>

      <p className="flex-1 px-4 text-center text-base md:text-left md:text-lg">
        <span className="text-slate-400">Updated at:</span>{' '}
        {selectedNote && formatDate(selectedNote.updatedAt)}
      </p>

      <BaseButton
        className="ml-auto p-3 text-rose-500/70 hover:text-rose-500"
        onClick={deleteSelectedNoteHanlder}
      >
        <RiDeleteBin2Line className="h-6 w-6" />
      </BaseButton>
    </header>
  );
};

export default NoteViewerHead;
