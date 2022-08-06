import BaseButton from '@/components/UI/BaseButton';
import { User } from 'firebase/auth';
import { memo } from 'react';
import { RiLogoutBoxLine } from 'react-icons/ri';

export interface NoteMenuFooterProps {
  user: User;
  onLogout: () => void;
}

const NoteMenuFooter = ({ user, onLogout }: NoteMenuFooterProps) => {
  return (
    <footer className="flex items-center gap-4 p-2">
      {user.photoURL && (
        <img
          src={user.photoURL}
          className="h-10 w-10"
          alt={user.displayName || 'Profile'}
        />
      )}
      <div>{user.displayName}</div>
      <BaseButton
        className="ml-auto p-3"
        onClick={onLogout}
        aria-label="Logout"
      >
        <RiLogoutBoxLine className="h-6 w-6" />
      </BaseButton>
    </footer>
  );
};

export default memo(NoteMenuFooter);
