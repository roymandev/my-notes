import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';

const NoteApp = () => {
  return (
    <main className="flex h-screen divide-x divide-slate-700 bg-slate-800 text-slate-300">
      <Sidebar />
      <NoteViewer />
    </main>
  );
};

export default NoteApp;
