import NoteList from '@/components/NoteList';
import SidebarFooter from '@/components/SidebarFooter';
import SidebarHeader from '@/components/SidebarHeader';
import { atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';
import { twMerge } from 'tailwind-merge';

const TheSidebar = () => {
  const selectedNoteId = useAtomValue(atomNotesSelectedId);

  return (
    <aside
      className={twMerge(
        'fixed w-full inset-0 flex-col divide-y z-10 divide-slate-700 bg-slate-800 flex md:relative md:w-[400px]',
        selectedNoteId && window.outerWidth < 768 && '-left-[100vw] md:left-0',
      )}
    >
      <SidebarHeader />
      <NoteList />
      <SidebarFooter />
    </aside>
  );
};

export default TheSidebar;
