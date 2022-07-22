import { Route, Routes } from 'react-router-dom';
import PageHome from '@/pages/PageHome';
import PageLogin from '@/pages/PageLogin';
import { auth } from '@/services/firebase';
import { atomUser } from '@/stores/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import { useSetAtom } from 'jotai';

function App() {
  const setUser = useSetAtom(atomUser);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/login" element={<PageLogin />} />
    </Routes>
  );
}

export default App;
