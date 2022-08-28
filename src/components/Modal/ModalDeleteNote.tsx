import BaseModal from '@/components/Modal/BaseModal';
import BaseButton from '@/components/BaseButton';
import useUserNotes from '@/hooks/useUserNotes';
import { atomModalClose } from '@/stores/appStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import FallbackLoading from '@/components/Fallback/FallbackLoading';
import { atomNotesSelected } from '@/stores/notesStore';
import { useNavigate } from 'react-router-dom';

const ModalDeleteNote = () => {
  const navigate = useNavigate();
  const closeModal = useSetAtom(atomModalClose);
  const selectedNote = useAtomValue(atomNotesSelected);
  const { deleteNote } = useUserNotes();
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    if (!selectedNote) return;

    setLoading(true);
    await deleteNote(selectedNote);
    closeModal();
    navigate('/note');
  };

  if (loading) return <FallbackLoading />;

  return (
    <BaseModal title="Delete note confirmation">
      <div className="p-4">
        <p>
          Delete &quot;<b>{selectedNote?.title || '(Untitled)'}</b>&quot; note?
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
