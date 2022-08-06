import FallbackNoSelectedNote from '@/components/Fallback/FallbackNoSelectedNote';
import ContainerModal from '@/components/Modal/ContainerModal';
import NoteMenu from '@/components/NoteMenu';
import NoteViewer from '@/components/UI/NoteViewer';
import useUserNotes from '@/hooks/useUserNotes';
import { atomIsMobile, atomModal } from '@/stores/appStore';
import { atomNotesSelected, atomNotesSelectedId } from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { Navigate } from 'react-router-dom';

const PageHome = () => {
  const isMobile = useAtomValue(atomIsMobile);
  const user = useAtomValue(atomUser);
  const selectedNote = useAtomValue(atomNotesSelected);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const { updateNote, addNote } = useUserNotes();
  const setModal = useSetAtom(atomModal);

  const deleteNoteHandler = useCallback(
    () => setModal('delete-note'),
    [setModal],
  );

  if (!user) return <Navigate to="/login" replace />;

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
          <FallbackNoSelectedNote onAddNote={addNote} />
        )}
      </main>
      <ContainerModal />
    </>
  );
};

export default PageHome;
