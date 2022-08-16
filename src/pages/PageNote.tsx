import FallbackLoading from '@/components/Fallback/FallbackLoading';
import FallbackNoSelectedNote from '@/components/Fallback/FallbackNoSelectedNote';
import ContainerModal from '@/components/Modal/ContainerModal';
import NoteMenu from '@/components/NoteMenu';
import NoteViewer from '@/components/NoteViewer';
import useUserNotes from '@/hooks/useUserNotes';
import { atomNotesOpened } from '@/stores/notesStore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const PageNote = () => {
  const { noteId } = useParams();
  const [openedNote, setOpenedNote] = useAtom(atomNotesOpened);
  const { getNoteById } = useUserNotes();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (noteId) {
      setLoading(true);

      getNoteById(noteId)
        .then((note) => note && setOpenedNote(note))
        .finally(() => setLoading(false));
    } else {
      setOpenedNote(null);
    }
  }, [noteId]);

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <NoteMenu />

      {loading ? (
        <FallbackLoading className="h-full flex-1" />
      ) : openedNote ? (
        <NoteViewer note={openedNote} />
      ) : (
        <FallbackNoSelectedNote />
      )}

      <Outlet />

      <ContainerModal />
    </main>
  );
};

export default PageNote;
