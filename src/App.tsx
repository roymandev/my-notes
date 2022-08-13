import { Route, Routes } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { lazy, Suspense, useEffect } from 'react';
import FallbackLoading from '@/components/Fallback/FallbackLoading';
import { atomIsMobile } from './stores/appStore';
import ProtectedRoutes from '@/components/Auth/ProtectedRoutes';
import LayoutNote from '@/components/Layout/LayoutNote';

const PageNoteNoSelected = lazy(() => import('@/pages/PageNoteNoSelected'));
const PageNoteViewer = lazy(() => import('@/pages/PageNoteViewer'));
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
          <Route path="/note" element={<LayoutNote />}>
            <Route path="" element={<PageNoteNoSelected />} />
            <Route path=":noteId" element={<PageNoteViewer />} />
          </Route>
        </Route>

        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
