import NoteList from '@/components/NoteList';
import NoteMenuFooter from '@/components/NoteMenuFooter';
import NoteMenuHeader from '@/components/NoteMenuHeader';
import { twMerge } from 'tailwind-merge';

const NoteMenu = () => {
  return (
    <aside
      className={twMerge(
        'fixed w-full inset-0 flex-col divide-y z-10 divide-slate-700 bg-slate-800 flex md:relative md:w-[400px]',
      )}
    >
      <NoteMenuHeader />
      <NoteList />
      <NoteMenuFooter />
    </aside>
  );
};

export default NoteMenu;
