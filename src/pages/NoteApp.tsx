import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';

const NoteApp = () => {
  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <Sidebar />
      <NoteViewer />
    </main>
  );
};

export default NoteApp;
