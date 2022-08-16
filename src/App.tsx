import { Route, Routes } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { lazy, Suspense, useEffect } from 'react';
import FallbackLoading from '@/components/Fallback/FallbackLoading';
import { atomIsMobile } from './stores/appStore';
import ProtectedRoutes from '@/components/Auth/ProtectedRoutes';

const PageNote = lazy(() => import('@/pages/PageNote'));
const PageLogin = lazy(() => import('@/pages/PageLogin'));

function App() {
  const setIsMobile = useSetAtom(atomIsMobile);

  useEffect(() => {
    setIsMobile(window.window.outerWidth < 768);
  }, []);

  return (
    <Suspense fallback={<FallbackLoading className="fixed inset-0" />}>
      <Routes>
        <Route path="/note" element={<ProtectedRoutes />}>
          <Route index element={<PageNote />} />
          <Route path=":noteId" element={<PageNote />} />
        </Route>

        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
