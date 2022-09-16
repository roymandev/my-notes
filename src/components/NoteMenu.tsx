import NoteList from '@/components/NoteList';
import NoteMenuFooter from '@/components/NoteMenuFooter';
import NoteMenuHeader from '@/components/NoteMenuHeader';
import { atomIsMobile } from '@/stores/appStore';
import { atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';
import { twMerge } from 'tailwind-merge';

const NoteMenu = () => {
  const isMobile = useAtomValue(atomIsMobile);
  const selectedNoteId = useAtomValue(atomNotesSelectedId);

  return (
    <aside
      className={twMerge(
        'fixed inset-0 z-10 flex w-full flex-col divide-y divide-slate-700 bg-slate-800 md:relative md:w-[400px]',
        isMobile && selectedNoteId && 'hidden',
      )}
    >
      <NoteMenuHeader />
      <NoteList />
      <NoteMenuFooter />
    </aside>
  );
};

export default NoteMenu;
