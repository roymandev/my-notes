import NoteViewerEditor, {
  NoteViewerEditorProps,
} from '@/components/UI/NoteViewerEditor';
import NoteViewerHead, {
  NoteViewerHeadProps,
} from '@/components/UI/NoteViewerHead';
import { Note } from '@/types/noteTypes';

export interface NoteViewerProps {
  note: Note;
  onDeleteNote: NoteViewerHeadProps['onDeleteNote'];
  onClosed: NoteViewerHeadProps['onReturn'];
  onNoteChange: NoteViewerEditorProps['onChange'];
}

const NoteViewer = ({
  note,
  onDeleteNote,
  onNoteChange,
  onClosed,
}: NoteViewerProps) => {
  return (
    <section className="flex h-full flex-1 flex-col divide-y divide-slate-700">
      <NoteViewerHead
        updatedAt={note.updatedAt}
        onDeleteNote={onDeleteNote}
        onReturn={onClosed}
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
