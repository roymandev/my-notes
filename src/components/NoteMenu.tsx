import NoteList from '@/components/UI/NoteList';
import SidebarFooter from '@/components/SidebarFooter';
import SidebarHeader from '@/components/SidebarHeader';
import { twMerge } from 'tailwind-merge';
import { useAtom, useAtomValue } from 'jotai';
import { atomNotes, atomNotesSelectedId } from '@/stores/notesStore';
import useUserNotes from '@/hooks/useUserNotes';
import { useEffect } from 'react';
import { atomIsMobile } from '@/stores/appStore';

const NoteMenu = () => {
  const isMobile = useAtomValue(atomIsMobile);
  const notes = useAtomValue(atomNotes);
  const [selectedNoteId, setSelectedNoteId] = useAtom(atomNotesSelectedId);
  const { fetchNotes } = useUserNotes();

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <aside
      className={twMerge(
        'fixed w-full inset-0 flex-col divide-y z-10 divide-slate-700 bg-slate-800 flex md:relative md:w-[400px]',
        isMobile && selectedNoteId && '-left-[100vw] md:left-0',
      )}
    >
      <SidebarHeader />
      <NoteList
        list={notes}
        selectedId={selectedNoteId}
        onNoteSelected={setSelectedNoteId}
      />
      <SidebarFooter />
    </aside>
  );
};

export default NoteMenu;
