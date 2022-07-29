import NoteList from '@/components/UI/NoteList';
import NoteMenuFooter from '@/components/NoteMenuFooter';
import NoteMenuHeader from '@/components/NoteMenuHeader';
import { twMerge } from 'tailwind-merge';
import { useAtom, useAtomValue } from 'jotai';
import { atomNotes, atomNotesSelectedId } from '@/stores/notesStore';
import useUserNotes from '@/hooks/useUserNotes';
import { useEffect, useState } from 'react';
import { atomIsMobile } from '@/stores/appStore';

const NoteMenu = () => {
  const isMobile = useAtomValue(atomIsMobile);
  const notes = useAtomValue(atomNotes);
  const [selectedNoteId, setSelectedNoteId] = useAtom(atomNotesSelectedId);
  const { fetchNotes } = useUserNotes();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchNotes().then(() => setIsFetching(false));
  }, []);

  return (
    <aside
      className={twMerge(
        'fixed w-full inset-0 flex-col divide-y z-10 divide-slate-700 bg-slate-800 flex md:relative md:w-[400px]',
        isMobile && selectedNoteId && '-left-[100vw] md:left-0',
      )}
    >
      <NoteMenuHeader />
      <NoteList
        list={notes}
        selectedId={selectedNoteId}
        onNoteSelected={setSelectedNoteId}
        isFetching={isFetching}
      />
      <NoteMenuFooter />
    </aside>
  );
};

export default NoteMenu;