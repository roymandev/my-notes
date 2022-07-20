import LoadingScreen from '@/components/LoadingScreen';
import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';
import useDatabase from '@/hooks/useDatabase';
import { atomNotes } from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

const NoteApp = () => {
  const [loading, setLoading] = useState(true);
  const { fetchUserNotes } = useDatabase();

  const user = useAtomValue(atomUser);
  const setNotes = useSetAtom(atomNotes);

  useEffect(() => {
    if (user) {
      fetchUserNotes().then((notes) => {
        setNotes(notes);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <LoadingScreen />;

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <Sidebar />
      <NoteViewer />
    </main>
  );
};

export default NoteApp;
