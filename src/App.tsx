import { Route, Routes } from 'react-router-dom';
import NoteApp from '@/pages/NoteApp';
import Login from '@/pages/Login';
import AuthRoute from '@/components/AuthRoute';
import { firebaseConfig } from '@/config/firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import { atomUser } from '@/stores/userStore';
import Note from '@/pages/Note';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const oAuthProvider = new GoogleAuthProvider();

function App() {
  const setUser = useSetAtom(atomUser);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute fetchNotes>
            <NoteApp />
          </AuthRoute>
        }
      />
      <Route path="/note">
        <Route
          path=":id"
          element={
            <AuthRoute>
              <Note />
            </AuthRoute>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
