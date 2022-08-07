import NoteViewerEditor, {
  NoteViewerEditorProps,
} from '@/components/NoteViewerEditor';
import NoteViewerHead, {
  NoteViewerHeadProps,
} from '@/components/NoteViewerHead';
import { Note } from '@/types/noteTypes';

export interface NoteViewerProps {
  note: Note;
  onDeleteNote: NoteViewerHeadProps['onDeleteNote'];
  onClose: NoteViewerHeadProps['onReturn'];
  onNoteChange: NoteViewerEditorProps['onChange'];
}

const NoteViewer = ({
  note,
  onDeleteNote,
  onNoteChange,
  onClose,
}: NoteViewerProps) => {
  return (
    <section className="flex h-full flex-1 flex-col divide-y divide-slate-700">
      <NoteViewerHead
        updatedAt={note.updatedAt}
        onDeleteNote={onDeleteNote}
        onReturn={onClose}
      />
      <NoteViewerEditor
        title={note.title}
        body={note.body}
        onChange={onNoteChange}
      />
    </section>
  );
};

export default NoteViewer;
