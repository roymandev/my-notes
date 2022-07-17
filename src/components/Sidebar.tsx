import NoteList from '@/components/NoteList';
import SidebarHeader from '@/components/SidebarHeader';

const TheSidebar = () => {
  return (
    <aside className="w-[320px] border-r border-slate-700">
      <SidebarHeader />

      <NoteList />
    </aside>
  );
};

export default TheSidebar;
