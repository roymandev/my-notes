import BaseModal from '@/components/Modal/BaseModal';
import BaseButton from '@/components/BaseButton';
import useUserNotes from '@/hooks/useUserNotes';
import { atomModalClose } from '@/stores/appStore';
import { atomNotesSelected } from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';

const ModalDeleteNote = () => {
  const closeModal = useSetAtom(atomModalClose);
  const selectedNote = useAtomValue(atomNotesSelected);
  const { deleteNote } = useUserNotes();

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
          onClick={() => {
            selectedNote && deleteNote(selectedNote);
            closeModal();
          }}
        >
          Delete
        </BaseButton>
      </div>
    </BaseModal>
  );
};

export default ModalDeleteNote;
