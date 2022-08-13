import NoteViewer, { NoteViewerProps } from '@/components/NoteViewer';
import useUserNotes from '@/hooks/useUserNotes';
import { atomIsMobile, atomModal } from '@/stores/appStore';
import { atomNotesSelected, atomNotesSelectedId } from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

const PageNoteViewer = () => {
  const isMobile = useAtomValue(atomIsMobile);
  const selectedNote = useAtomValue(atomNotesSelected);
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const { updateNote } = useUserNotes();
  const setModal = useSetAtom(atomModal);

  const deleteNoteHandler = useCallback(
    () => setModal('delete-note'),
    [setModal],
  );

  const updateNoteHandler: NoteViewerProps['onNoteChange'] = (updated) =>
    selectedNote && updateNote(updated, selectedNote);

  return (
    selectedNote && (
      <NoteViewer
        initialNote={selectedNote}
        onNoteChange={updateNoteHandler}
        onDeleteNote={deleteNoteHandler}
        onClose={isMobile ? () => setSelectedNoteId(null) : undefined}
      />
    )
  );
};

export default PageNoteViewer;
