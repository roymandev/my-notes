import NoteViewerEditor from '@/components/NoteViewerEditor';
import NoteViewerHead from '@/components/NoteViewerHead';
import useUserNotes from '@/hooks/useUserNotes';
import { atomIsMobile, atomModal } from '@/stores/appStore';
import { BaseNote, Note } from '@/types/noteTypes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface NoteViewerProps {
  note: Note | null;
}

const NoteViewer = ({ note }: NoteViewerProps) => {
  const isMobile = useAtomValue(atomIsMobile);
  const [currentNote, setCurrentNote] = useState(note);
  const { updateNote } = useUserNotes();
  const navigate = useNavigate();
  const setModal = useSetAtom(atomModal);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCurrentNote(note);
  }, [note]);

  const deleteNoteHandler = useCallback(
    () => setModal('delete-note'),
    [setModal],
  );

  const noteChangeHanlder = (updated: Partial<BaseNote>) => {
    if (currentNote) {
      setCurrentNote({ ...currentNote, ...updated });

      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(
        () => updateNote(updated, currentNote),
        1000,
      );
    }
  };

  return (
    currentNote && (
      <section className="flex h-full flex-1 flex-col divide-y divide-slate-700">
        <NoteViewerHead
          updatedAt={currentNote.updatedAt}
          onDeleteNote={deleteNoteHandler}
          onReturn={isMobile ? () => navigate('/note') : undefined}
        />
        <NoteViewerEditor
          title={currentNote.title}
          body={currentNote.body}
          onChange={noteChangeHanlder}
        />
      </section>
    )
  );
};

export default NoteViewer;
