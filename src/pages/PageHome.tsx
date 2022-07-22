import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';
import { atomUser } from '@/stores/userStore';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';

const PageHome = () => {
  const user = useAtomValue(atomUser);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <Sidebar />
      <NoteViewer />
    </main>
  );
};

export default PageHome;
