import FallbackLoading from '@/components/Fallback/FallbackLoading';
import FallbackNoSelectedNote from '@/components/Fallback/FallbackNoSelectedNote';
import ContainerModal from '@/components/Modal/ContainerModal';
import NoteMenu from '@/components/NoteMenu';
import NoteViewer from '@/components/NoteViewer';
import useUserNotes from '@/hooks/useUserNotes';
import { atomIsMobile } from '@/stores/appStore';
import {
  atomNotes,
  atomNotesSelected,
  atomNotesSelectedId,
} from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PageNote = () => {
  const { noteId } = useParams();
  const notes = useAtomValue(atomNotes);
  const selectedNote = useAtomValue(atomNotesSelected);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const { fetchNoteById, fetchNotes } = useUserNotes();
  const [loading, setLoading] = useState(true);
  const isMobile = useAtomValue(atomIsMobile);
  const isNotesLoaded = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedNoteId(noteId || null);

    (async () => {
      // Only fetch selectedNote in mobile view
      if (isMobile && noteId) {
        setLoading(true);
        if (!notes.find((note) => note.id === noteId)) {
          await fetchNoteById(noteId);
        }
      } else if (!isNotesLoaded.current) {
        setLoading(true);
        await fetchNotes().then(() => (isNotesLoaded.current = true));
      }

      setLoading(false);

      if (!notes.find((note) => note.id === noteId))
        navigate('/note', { replace: true });
    })();
  }, [noteId]);

  if (loading) return <FallbackLoading className="fixed inset-0 flex-1" />;

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      {(!isMobile || !noteId) && <NoteMenu />}

      {noteId ? <NoteViewer note={selectedNote} /> : <FallbackNoSelectedNote />}

      <ContainerModal />
    </main>
  );
};

export default PageNote;
