import FallbackLoading from '@/components/Fallback/FallbackLoading';
import ContainerModal from '@/components/Modal/ContainerModal';
import NoteMenu from '@/components/NoteMenu';
import NoteViewer from '@/components/NoteViewer';
import useUserNotes from '@/hooks/useUserNotes';
import { atomNotesSelected, atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PageNote = () => {
  const { noteId } = useParams();
  const selectedNote = useAtomValue(atomNotesSelected);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const { getNoteById } = useUserNotes();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (noteId) {
      setLoading(true);

      getNoteById(noteId)
        .then((note) => note && setSelectedNoteId(note.id))
        .finally(() => setLoading(false));
    } else {
      setSelectedNoteId(null);
    }
  }, [noteId]);

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <NoteMenu />

      {loading ? (
        <FallbackLoading className="h-full flex-1" />
      ) : (
        <NoteViewer note={selectedNote} />
      )}

      <ContainerModal />
    </main>
  );
};

export default PageNote;
