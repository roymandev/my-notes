import { atomModal, atomModalClose } from '@/stores/appStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { lazy } from 'react';

const ModalDeleteNote = lazy(
  () => import('@/components/Modal/ModalDeleteNote'),
);

const ContainerModal = () => {
  const modal = useAtomValue(atomModal);
  const closeModal = useSetAtom(atomModalClose);

  return (
    modal && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-slate-700/40 text-lg text-slate-300"
        tabIndex={-1}
        onClick={closeModal}
      >
        {modal === 'delete-note' && <ModalDeleteNote />}
      </div>
    )
  );
};

export default ContainerModal;
