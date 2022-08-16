import NoteList from '@/components/NoteList';
import NoteMenuFooter from '@/components/NoteMenuFooter';
import NoteMenuHeader from '@/components/NoteMenuHeader';
import { twMerge } from 'tailwind-merge';
import { useAtomValue } from 'jotai';
import { atomNotesOpened } from '@/stores/notesStore';
import { atomIsMobile } from '@/stores/appStore';

const NoteMenu = () => {
  const isMobile = useAtomValue(atomIsMobile);
  const openedNote = useAtomValue(atomNotesOpened);

  return (
    <aside
      className={twMerge(
        'fixed w-full inset-0 flex-col divide-y z-10 divide-slate-700 bg-slate-800 flex md:relative md:w-[400px]',
        isMobile && openedNote && '-left-[100vw] md:left-0',
      )}
    >
      <NoteMenuHeader />
      <NoteList />
      <NoteMenuFooter />
    </aside>
  );
};

export default NoteMenu;
