import { Route, Routes } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { lazy, Suspense, useEffect } from 'react';
import FallbackLoading from '@/components/Fallback/FallbackLoading';
import { atomIsMobile } from './stores/appStore';
import ProtectedRoutes from '@/components/Auth/ProtectedRoutes';

const PageHome = lazy(() => import('@/pages/PageHome'));
const PageLogin = lazy(() => import('@/pages/PageLogin'));

function App() {
  const setIsMobile = useSetAtom(atomIsMobile);

  useEffect(() => {
    setIsMobile(window.window.outerWidth < 768);
  }, []);

  return (
    <Suspense fallback={<FallbackLoading className="fixed inset-0" />}>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<PageHome />} />
        </Route>

        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
