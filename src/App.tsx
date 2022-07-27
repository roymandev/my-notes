import { Route, Routes } from 'react-router-dom';
import { auth } from '@/services/firebase';
import { atomUser } from '@/stores/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import { lazy, Suspense, useEffect } from 'react';
import FallbackLoading from '@/components/Fallback/FallbackLoading';
import { atomIsMobile } from './stores/appStore';

const PageHome = lazy(() => import('@/pages/PageHome'));
const PageLogin = lazy(() => import('@/pages/PageLogin'));

function App() {
  const setUser = useSetAtom(atomUser);
  const setIsMobile = useSetAtom(atomIsMobile);

  useEffect(() => {
    setIsMobile(window.window.outerWidth < 768);
  }, []);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <Suspense fallback={<FallbackLoading className="fixed inset-0" />}>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
