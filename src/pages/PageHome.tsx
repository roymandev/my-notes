import FallbackNoSelectedNote from '@/components/Fallback/FallbackNoSelectedNote';
import ContainerModal from '@/components/Modal/ContainerModal';
import NoteMenu from '@/components/NoteMenu';
import NoteViewer from '@/components/NoteViewer';
import useUserNotes from '@/hooks/useUserNotes';
import { atomIsMobile, atomModal } from '@/stores/appStore';
import { atomNotesSelected, atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

const PageHome = () => {
  const isMobile = useAtomValue(atomIsMobile);
  const selectedNote = useAtomValue(atomNotesSelected);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const { updateNote } = useUserNotes();
  const setModal = useSetAtom(atomModal);

  const deleteNoteHandler = useCallback(
    () => setModal('delete-note'),
    [setModal],
  );

  return (
    <>
      <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
        <NoteMenu />

        {selectedNote ? (
          <NoteViewer
            note={selectedNote}
            onNoteChange={(updated) => updateNote(updated, selectedNote)}
            onDeleteNote={deleteNoteHandler}
            onClose={isMobile ? () => setSelectedNoteId(null) : undefined}
          />
        ) : (
          <FallbackNoSelectedNote />
        )}
      </main>
      <ContainerModal />
    </>
  );
};

export default PageHome;
