import { Navigate, Route, Routes } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { lazy, Suspense, useEffect } from 'react';
import { atomIsMobile } from './stores/appStore';
import LoadingFullscreen from '@/components/Fallback/LoadingFullscreen';

const AuthRoutes = lazy(() => import('@/components/Auth/AuthRoutes'));
const ProtectedRoutes = lazy(() => import('@/components/Auth/ProtectedRoutes'));

const PageHome = lazy(() => import('@/pages/PageHome'));
const PageNote = lazy(() => import('@/pages/PageNote'));
const PageLogin = lazy(() => import('@/pages/PageLogin'));

function App() {
  const setIsMobile = useSetAtom(atomIsMobile);

  useEffect(() => {
    setIsMobile(window.window.outerWidth < 768);
  }, []);

  return (
    <Suspense fallback={<LoadingFullscreen />}>
      <Routes>
        <Route path="/" element={<PageHome />} />

        <Route element={<AuthRoutes />}>
          <Route path="/note" element={<ProtectedRoutes />}>
            <Route index element={<PageNote />} />
            <Route path=":noteId" element={<PageNote />} />
          </Route>

          <Route path="/login" element={<PageLogin />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
