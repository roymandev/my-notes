import NoteViewerEditor from '@/components/NoteViewerEditor';
import NoteViewerHead from '@/components/NoteViewerHead';
import { atomNotes, atomNotesSelected } from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Note = () => {
  const { id } = useParams();
  const notes = useAtomValue(atomNotes);
  const setSelectedNote = useSetAtom(atomNotesSelected);

  useEffect(() => {
    const getNote = notes.find((note) => note.id === id) ?? null;

    setSelectedNote(getNote);
  }, [id, notes]);

  return (
    <main className="fixed inset-0 flex-1 flex-col divide-y divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <NoteViewerHead />
      <NoteViewerEditor />
    </main>
  );
};

export default Note;
