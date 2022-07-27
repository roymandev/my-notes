import NoteMenu from '@/components/NoteMenu';
import useUserNotes from '@/hooks/useUserNotes';
import { atomNotesSelected } from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { useAtomValue } from 'jotai';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const NoteViewer = lazy(() => import('@/components/UI/NoteViewer'));
const FallbackNoSelectedNote = lazy(
  () => import('@/components/Fallback/FallbackNoSelectedNote'),
);

const PageHome = () => {
  const user = useAtomValue(atomUser);
  const selectedNote = useAtomValue(atomNotesSelected);
  const { deleteNote, updateNote, addNote } = useUserNotes();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <NoteMenu />

      {selectedNote ? (
        <NoteViewer
          note={selectedNote}
          onDeleteNote={() => deleteNote(selectedNote)}
          onNoteChange={(updated) => updateNote(updated, selectedNote)}
        />
      ) : (
        <FallbackNoSelectedNote onAddNote={addNote} />
      )}
    </main>
  );
};

export default PageHome;
