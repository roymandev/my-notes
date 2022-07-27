import FallbackNoSelectedNote from '@/components/Fallback/FallbackNoSelectedNote';
import NoteViewerEditor from '@/components/NoteViewerEditor';
import NoteViewerHead from '@/components/NoteViewerHead';
import { atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';

const NoteViewer = () => {
  const selectedNoteId = useAtomValue(atomNotesSelectedId);

  return (
    <section className="flex h-full flex-1 flex-col divide-y divide-slate-700">
      {selectedNoteId ? (
        <>
          <NoteViewerHead />
          <NoteViewerEditor />
        </>
      ) : (
        <FallbackNoSelectedNote />
      )}
    </section>
  );
};

export default NoteViewer;
