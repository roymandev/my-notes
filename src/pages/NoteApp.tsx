import Sidebar from '@/components/Sidebar';

const NoteApp = () => {
  return (
    <main className="flex h-screen divide-x divide-slate-700 bg-slate-800 text-slate-300">
      <Sidebar />
      <section className="flex-1"></section>
    </main>
  );
};

export default NoteApp;
