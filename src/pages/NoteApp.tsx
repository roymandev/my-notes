import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';

const NoteApp = () => {
  return (
    <main className="h-screen divide-x divide-slate-700 bg-slate-800 text-slate-300 md:flex">
      <Sidebar />
      <NoteViewer />
    </main>
  );
};

export default NoteApp;
