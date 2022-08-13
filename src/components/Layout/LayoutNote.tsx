import ContainerModal from '@/components/Modal/ContainerModal';
import NoteMenu from '@/components/NoteMenu';
import { atomNotesSelectedId } from '@/stores/notesStore';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const LayoutNote = () => {
  const setSelectedNoteId = useSetAtom(atomNotesSelectedId);
  const { noteId } = useParams();

  useEffect(() => setSelectedNoteId(noteId ?? null), [noteId]);

  return (
    <main className="fixed inset-0 divide-x divide-slate-700 bg-slate-800 text-lg text-slate-300 md:flex">
      <NoteMenu />

      <Outlet />

      <ContainerModal />
    </main>
  );
};

export default LayoutNote;
