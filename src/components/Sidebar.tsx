import NoteList from '@/components/NoteList';
import NoteSearch from '@/components/NoteSearch';
import SidebarFooter from '@/components/SidebarFooter';
import SidebarHeader from '@/components/SidebarHeader';
import { atomNotesSelected } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';
import { twMerge } from 'tailwind-merge';

const TheSidebar = () => {
  const selectedItem = useAtomValue(atomNotesSelected);

  return (
    <aside
      className={twMerge(
        'fixed w-full inset-0 flex-col divide-y z-10 divide-slate-700 bg-slate-800 flex sm:relative sm:w-[400px]',
        selectedItem && window.outerWidth < 640 && '-left-[100vw] sm:left-0',
      )}
    >
      <SidebarHeader />
      <NoteSearch />
      <NoteList />
      <SidebarFooter />
    </aside>
  );
};

export default TheSidebar;
