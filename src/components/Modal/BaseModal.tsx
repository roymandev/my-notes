import BaseButton from '@/components/UI/BaseButton';
import { atomModalClose } from '@/stores/appStore';
import { useSetAtom } from 'jotai';
import { RiCloseFill } from 'react-icons/ri';

export interface BaseModalProps {
  title: string;
  children: React.ReactNode;
}

const BaseModal = ({ title, children }: BaseModalProps) => {
  const closeModal = useSetAtom(atomModalClose);

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded bg-slate-800 shadow">
      <div className="flex items-center border-b border-slate-700 p-2 pl-4">
        {title}
        <BaseButton className="ml-auto p-2" onClick={closeModal}>
          <RiCloseFill className="h-6 w-6" />
        </BaseButton>
      </div>
      {children}
    </div>
  );
};

export default BaseModal;
