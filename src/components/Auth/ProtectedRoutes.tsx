import { atomUser } from '@/stores/userStore';
import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const user = useAtomValue(atomUser);

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
