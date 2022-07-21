import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';
import { atomNotesSelected } from '@/stores/notesStore';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

const PageHome = () => {
  const setSelectedNote = useSetAtom(atomNotesSelected);

  const listenBackButton = () => setSelectedNote((current) => current && null);

  useEffect(() => {
    window.addEventListener('popstate', listenBackButton);
    return () => {
      window.removeEventListener('popstate', listenBackButton);
    };
  }, []);

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <Sidebar />
      <NoteViewer />
    </main>
  );
};

export default PageHome;
