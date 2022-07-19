import NoteList from '@/components/NoteList';
import NoteSearch from '@/components/NoteSearch';
import SidebarHeader from '@/components/SidebarHeader';

const TheSidebar = () => {
  return (
    <aside className="flex w-[320px] flex-col divide-y divide-slate-700">
      <SidebarHeader />
      <NoteSearch />
      <NoteList />
    </aside>
  );
};

export default TheSidebar;
