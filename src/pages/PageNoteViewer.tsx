import FallbackLoading from '@/components/Fallback/FallbackLoading';
import NoteViewer from '@/components/NoteViewer';
import useUserNotes from '@/hooks/useUserNotes';
import { atomNotesSelectedId } from '@/stores/notesStore';
import { Note } from '@/types/noteTypes';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

const PageNoteViewer = () => {
  const selectedNoteId = useAtomValue(atomNotesSelectedId);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { getNoteById } = useUserNotes();

  useEffect(() => {
    if (selectedNoteId)
      getNoteById(selectedNoteId).then((note) => note && setSelectedNote(note));
  }, [selectedNoteId]);

  if (!selectedNote) return <FallbackLoading className="flex-1" />;

  return <NoteViewer note={selectedNote} />;
};

export default PageNoteViewer;
