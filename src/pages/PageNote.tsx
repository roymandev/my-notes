import FallbackNoSelectedNote from '@/components/Fallback/FallbackNoSelectedNote';
import LoadingFullscreen from '@/components/Fallback/LoadingFullscreen';
import ContainerModal from '@/components/Modal/ContainerModal';
import NoteMenu from '@/components/NoteMenu';
import NoteViewer from '@/components/NoteViewer';
import useUserNotes from '@/hooks/useUserNotes';
import {
  atomNotes,
  atomNotesSelected,
  atomNotesSelectedId,
} from '@/stores/notesStore';
import { Note } from '@/types/noteTypes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PageNote = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const selectedNote = useAtomValue(atomNotesSelected);
  const { fetchNotes } = useUserNotes();
  const [loading, setLoading] = useState(true);
  const getNoteById = useAtomCallback<Note | null, string>(
    useCallback(
      (get, set, arg) => get(atomNotes).find((note) => note.id === arg) || null,
      [],
    ),
  );

  useEffect(() => {
    (async () => {
      // Fetch notes once
      if (loading) {
        await fetchNotes();
        setLoading(false);
      }

      if (noteId) {
        // Check if selected note exist
        if (getNoteById(noteId)) {
          setSelectedNoteId(noteId);
        } else navigate('/note', { replace: true });
      } else setSelectedNoteId(null);
    })();
  }, [noteId]);

  if (loading) return <LoadingFullscreen />;

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <NoteMenu />

      {selectedNote ? (
        <NoteViewer note={selectedNote} />
      ) : (
        <FallbackNoSelectedNote />
      )}

      <ContainerModal />
    </main>
  );
};

export default PageNote;
