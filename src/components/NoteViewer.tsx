import NoteViewerBlank from '@/components/NoteViewerBlank';
import NoteViewerHead from '@/components/NoteViewerHead';
import { atomNotesSelected } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';

const NoteViewer = () => {
  const selectedNote = useAtomValue(atomNotesSelected);

  return (
    <section className="flex flex-1 flex-col divide-y divide-slate-700">
      {selectedNote ? (
        <>
          <NoteViewerHead />

          <div></div>
        </>
      ) : (
        <NoteViewerBlank />
      )}
    </section>
  );
};

export default NoteViewer;
