import BaseButton from '@/components/UI/BaseButton';
import { logout } from '@/services/firebase';
import { atomUser } from '@/stores/userStore';
import { useAtomValue } from 'jotai';
import { RiLogoutBoxLine } from 'react-icons/ri';

const NoteMenuFooter = () => {
  const user = useAtomValue(atomUser);

  return (
    <footer className="flex items-center gap-4 p-2">
      {user?.photoURL && (
        <img
          src={user.photoURL}
          className="h-10 w-10"
          alt={user.displayName || 'Profile'}
        />
      )}
      <div>{user?.displayName}</div>
      <BaseButton className="ml-auto p-3" onClick={logout} aria-label="Logout">
        <RiLogoutBoxLine className="h-6 w-6" />
      </BaseButton>
    </footer>
  );
};

export default NoteMenuFooter;
