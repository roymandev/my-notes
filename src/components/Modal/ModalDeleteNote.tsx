import BaseModal from '@/components/Modal/BaseModal';
import BaseButton from '@/components/BaseButton';
import useUserNotes from '@/hooks/useUserNotes';
import { atomModalClose } from '@/stores/appStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import FallbackLoading from '@/components/Fallback/FallbackLoading';
import { atomNotesOpened } from '@/stores/notesStore';

const ModalDeleteNote = () => {
  const closeModal = useSetAtom(atomModalClose);
  const openedNote = useAtomValue(atomNotesOpened);
  const { deleteNote } = useUserNotes();
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    if (!openedNote) return;

    setLoading(true);
    await deleteNote(openedNote);
    closeModal();
  };

  if (loading) return <FallbackLoading />;

  return (
    <BaseModal title="Delete note confirmation">
      <div className="p-4">
        <p>
          Delete &quot;<b>{openedNote?.title || '(Untitled)'}</b>&quot; note?
        </p>
      </div>
      <div className="flex justify-end gap-2 p-2">
        <BaseButton className="px-3 py-1" onClick={closeModal}>
          Close
        </BaseButton>
        <BaseButton
          className="px-3 py-1 text-rose-500"
          variant="primary"
          onClick={deleteHandler}
        >
          Delete
        </BaseButton>
      </div>
    </BaseModal>
  );
};

export default ModalDeleteNote;
