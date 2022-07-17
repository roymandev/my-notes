import BaseButton from '@/components/BaseButton';
import {
  atomNotesDeleteSelected,
  atomNotesSelected,
} from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { formatDate } from '@/utils/formatDate';

const NoteViewerHead = () => {
  const selectedNote = useAtomValue(atomNotesSelected);
  const deleteSelectedNoteHanlder = useSetAtom(atomNotesDeleteSelected);

  return (
    <header className="flex items-center p-1">
      <p className="px-2">
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
