import FallbackLoading from '@/components/Fallback/FallbackLoading';
import { atomModal } from '@/stores/appStore';
import { useAtomValue } from 'jotai';
import { lazy, Suspense } from 'react';

const ModalDeleteNote = lazy(
  () => import('@/components/Modal/ModalDeleteNote'),
);

const ContainerModal = () => {
  const modal = useAtomValue(atomModal);

  return (
    modal && (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-700/40 text-lg text-slate-300 backdrop-blur-sm">
        <Suspense fallback={<FallbackLoading />}>
          {modal === 'delete-note' && <ModalDeleteNote />}
        </Suspense>
      </div>
    )
  );
};

export default ContainerModal;
