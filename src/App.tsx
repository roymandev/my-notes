import { Route, Routes } from 'react-router-dom';
import PageHome from '@/pages/PageHome';
import PageLogin from '@/pages/PageLogin';
import AuthRoute from '@/components/AuthRoute';
import { firebaseConfig } from '@/config/firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import { atomUser } from '@/stores/userStore';

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
            <PageHome />
          </AuthRoute>
        }
      />
      <Route path="/login" element={<PageLogin />} />
    </Routes>
  );
}

export default App;
