import FallbackNoSelectedNote from '@/components/Fallback/FallbackNoSelectedNote';
import NoteViewer from '@/components/UI/NoteViewer';
import Sidebar from '@/components/Sidebar';
import useUserNotes from '@/hooks/useUserNotes';
import { atomNotesSelected } from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';

const PageHome = () => {
  const user = useAtomValue(atomUser);
  const selectedNote = useAtomValue(atomNotesSelected);
  const { deleteNote, updateNote, addNote } = useUserNotes();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <Sidebar />

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
