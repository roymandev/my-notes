import BaseButton from '@/components/BaseButton';
import useAuth from '@/hooks/useAuth';
import { atomUser } from '@/stores/userStore';
import { useAtomValue } from 'jotai';
import { RiLogoutBoxLine } from 'react-icons/ri';

const SidebarFooter = () => {
  const { logOut } = useAuth();
  const user = useAtomValue(atomUser);

  return (
    <footer className="flex items-center gap-4 p-2">
      {user?.photoURL && <img src={user.photoURL} className="h-10 w-10" />}
      <div>{user?.displayName}</div>
      <BaseButton
        className="ml-auto p-3"
        onClick={() => {
          if (confirm('Logout ?')) logOut();
        }}
      >
        <RiLogoutBoxLine className="h-6 w-6" />
      </BaseButton>
    </footer>
  );
};

export default SidebarFooter;
