import NoteViewerBlank from '@/components/NoteViewerBlank';
import NoteViewerEditor from '@/components/NoteViewerEditor';
import NoteViewerHead from '@/components/NoteViewerHead';
import { atomNotesSelected } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';

const NoteViewer = () => {
  const selectedNote = useAtomValue(atomNotesSelected);

  return (
    <section className="flex h-full flex-1 flex-col divide-y divide-slate-700">
      {selectedNote ? (
        <>
          <NoteViewerHead />

          <NoteViewerEditor />
        </>
      ) : (
        <NoteViewerBlank />
      )}
    </section>
  );
};

export default NoteViewer;
