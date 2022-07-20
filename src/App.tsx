import { Route, Routes } from 'react-router-dom';
import NoteApp from '@/pages/NoteApp';
import Login from '@/pages/Login';
import AuthRoute from '@/components/AuthRoute';
import { firebaseConfig } from '@/../firebase.config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useAtom, useSetAtom } from 'jotai';
import { atomUser } from '@/stores/userStore';
import { atomNotes } from '@/stores/notesStore';
import useDatabase from '@/hooks/useDatabase';
import { useEffect } from 'react';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const oAuthProvider = new GoogleAuthProvider();

function App() {
  const { fetchUserNotes } = useDatabase();

  const [user, setUser] = useAtom(atomUser);
  const setNotes = useSetAtom(atomNotes);

  useEffect(() => {
    if (user) {
      fetchUserNotes(user).then((notes) => {
        setNotes(notes);
      });
    }
  }, [user]);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <NoteApp />
          </AuthRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
