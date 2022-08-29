import BaseButton from '@/components/BaseButton';
import { RiArrowLeftSLine, RiDeleteBin2Line } from 'react-icons/ri';
import { formatDate } from '@/utils/formatDate';

export interface NoteViewerHeadProps {
  updatedAt: string;
  onDeleteNote: () => void;
  onReturn?: () => void;
}

const NoteViewerHead = ({
  updatedAt,
  onDeleteNote,
  onReturn,
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

      <p className="flex flex-1 flex-col items-center gap-0 px-4 text-center text-base md:flex-row md:gap-1 md:text-left md:text-lg">
        <span className="text-slate-400">Updated at:</span>{' '}
        {formatDate(updatedAt)}
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
