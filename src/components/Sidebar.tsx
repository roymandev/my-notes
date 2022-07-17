import NoteList from '@/components/NoteList';
import SidebarHeader from '@/components/SidebarHeader';

const TheSidebar = () => {
  return (
    <aside className="flex w-[320px] flex-col divide-y divide-slate-700">
      <SidebarHeader />

      <NoteList />
    </aside>
  );
};

export default TheSidebar;
