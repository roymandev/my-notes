import NoteViewerEditor from '@/components/NoteViewerEditor';
import NoteViewerHead from '@/components/NoteViewerHead';
import useUserNotes from '@/hooks/useUserNotes';
import { atomIsMobile, atomModal } from '@/stores/appStore';
import { atomNotesSelectedId } from '@/stores/notesStore';
import { BaseNote, Note } from '@/types/noteTypes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

export interface NoteViewerProps {
  note: Note;
}

const NoteViewer = ({ note }: NoteViewerProps) => {
  const isMobile = useAtomValue(atomIsMobile);
  const [currentNote, setCurrentNote] = useState(note);
  const { updateNote } = useUserNotes();
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const setModal = useSetAtom(atomModal);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentNote(note);
  }, [note.id]);

  const deleteNoteHandler = useCallback(
    () => setModal('delete-note'),
    [setModal],
  );

  const noteChangeHanlder = async (updated: Partial<BaseNote>) => {
    setLoading(true);

    setCurrentNote({ ...note, ...updated });
    await updateNote(updated, currentNote);

    setLoading(false);
  };

  return (
    <section className="flex h-full flex-1 flex-col divide-y divide-slate-700">
      <NoteViewerHead
        updatedAt={currentNote.updatedAt}
        onDeleteNote={deleteNoteHandler}
        onReturn={isMobile ? () => setSelectedNoteId(null) : undefined}
        isSaving={loading}
      />
      <NoteViewerEditor
        title={currentNote.title}
        body={currentNote.body}
        onChange={noteChangeHanlder}
      />
    </section>
  );
};

export default NoteViewer;
