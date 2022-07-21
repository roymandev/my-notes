import LoadingScreen from '@/components/LoadingScreen';
import useDatabase from '@/hooks/useDatabase';
import { atomNotes } from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  children: React.ReactNode;
  fetchNotes?: boolean;
}

const AuthRoute = ({ children, fetchNotes = false }: AuthRouteProps) => {
  const [loading, setLoading] = useState(true);
  const { fetchUserNotes } = useDatabase();

  const user = useAtomValue(atomUser);
  const setNotes = useSetAtom(atomNotes);

  // Only fetch notes for specific routes
  useEffect(() => {
    if (fetchNotes) {
      fetchUserNotes().then((notes) => {
        setNotes(notes);
        setLoading(false);
      });
    } else setLoading(false);
  }, [fetchNotes]);

  if (loading) return <LoadingScreen />;

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
