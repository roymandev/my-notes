import NoteViewerEditor from '@/components/NoteViewerEditor';
import NoteViewerHead, {
  NoteViewerHeadProps,
} from '@/components/NoteViewerHead';
import { BaseNote, Note } from '@/types/noteTypes';
import { useEffect, useState } from 'react';

export interface NoteViewerProps {
  initialNote: Note;
  onDeleteNote: NoteViewerHeadProps['onDeleteNote'];
  onClose: NoteViewerHeadProps['onReturn'];
  onNoteChange: (updateNote: Partial<BaseNote>) => void | Promise<void>;
}

const NoteViewer = ({
  initialNote,
  onDeleteNote,
  onNoteChange,
  onClose,
}: NoteViewerProps) => {
  const [note, setNote] = useState(initialNote);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote.id]);

  const noteChangeHanlder: typeof onNoteChange = async (updateNote) => {
    setLoading(true);

    setNote({ ...note, ...updateNote });
    await onNoteChange(updateNote);

    setLoading(false);
  };

  return (
    <section className="flex h-full flex-1 flex-col divide-y divide-slate-700">
      <NoteViewerHead
        updatedAt={note.updatedAt}
        onDeleteNote={onDeleteNote}
        onReturn={onClose}
        isSaving={loading}
      />
      <NoteViewerEditor
        title={note.title}
        body={note.body}
        onChange={noteChangeHanlder}
      />
    </section>
  );
};

export default NoteViewer;
