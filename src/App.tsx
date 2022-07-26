import { Route, Routes } from 'react-router-dom';
import { auth } from '@/services/firebase';
import { atomUser } from '@/stores/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

const PageHome = lazy(() => import('@/pages/PageHome'));
const PageLogin = lazy(() => import('@/pages/PageLogin'));

function App() {
  const setUser = useSetAtom(atomUser);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <Suspense fallback={<Loading className="fixed inset-0" />}>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
