import BaseButton from '@/components/BaseButton';
import { RiArrowLeftSLine, RiDeleteBin2Line } from 'react-icons/ri';
import { formatDate } from '@/utils/formatDate';
import { CgSpinner } from 'react-icons/cg';

export interface NoteViewerHeadProps {
  updatedAt: string;
  onDeleteNote: () => void;
  onReturn?: () => void;
  isSaving: boolean;
}

const NoteViewerHead = ({
  updatedAt,
  onDeleteNote,
  onReturn,
  isSaving,
}: NoteViewerHeadProps) => {
  return (
    <header className="flex items-center p-2">
      {onReturn && (
        <BaseButton
          className="p-2 md:hidden"
          onClick={onReturn}
          aria-label="Return"
        >
          <RiArrowLeftSLine className="h-8 w-8" />
        </BaseButton>
      )}

      <p className="flex flex-1 items-center gap-1 px-4 text-center text-base md:text-left md:text-lg">
        <span className="text-slate-400">Updated at:</span>{' '}
        {formatDate(updatedAt)}
        {isSaving && (
          <span className="ml-2 flex items-center gap-1 text-emerald-500">
            <CgSpinner className="animate-spin" /> Saving
          </span>
        )}
      </p>

      <BaseButton
        className="ml-auto p-3 text-rose-500/70 hover:text-rose-500"
        onClick={onDeleteNote}
        aria-label="Delete Note"
      >
        <RiDeleteBin2Line className="h-6 w-6" />
      </BaseButton>
    </header>
  );
};

export default NoteViewerHead;
