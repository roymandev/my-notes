import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';
import { atomNotesSelected } from '@/stores/notesStore';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

const PageHome = () => {
  const setSelectedNote = useSetAtom(atomNotesSelected);

  useEffect(() => {
    const listenBackButton = window.addEventListener('popstate', () =>
      setSelectedNote((current) => current && null),
    );
    return listenBackButton;
  }, []);

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <Sidebar />
      <NoteViewer />
    </main>
  );
};

export default PageHome;
