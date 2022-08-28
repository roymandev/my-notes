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
import { useParams } from 'react-router-dom';

const PageNote = () => {
  const { noteId } = useParams();
  const notes = useAtomValue(atomNotes);
  const selectedNote = useAtomValue(atomNotesSelected);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const { fetchNoteById, fetchNotes } = useUserNotes();
  const [loading, setLoading] = useState(true);
  const isMobile = useAtomValue(atomIsMobile);
  const isNotesLoaded = useRef(false);

  useEffect(() => {
    setSelectedNoteId(noteId || null);

    // Only fetch selectedNote in mobile view
    if (isMobile && noteId) {
      if (!notes.find((note) => note.id === noteId)) {
        setLoading(true);
        fetchNoteById(noteId).finally(() => setLoading(false));
      }
    } else if (!isNotesLoaded.current) {
      setLoading(true);
      fetchNotes()
        .then(() => (isNotesLoaded.current = true))
        .finally(() => setLoading(false));
    }
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
