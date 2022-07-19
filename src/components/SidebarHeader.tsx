import BaseButton from '@/components/BaseButton';
import { atomNotesAdd } from '@/stores/notesStore';
import { useSetAtom } from 'jotai';
import { RiAddFill } from 'react-icons/ri';

const SidebarHeader = () => {
  const addNewNote = useSetAtom(atomNotesAdd);

  return (
    <header className="flex items-center p-2">
      <h1 className="px-4 py-2 text-2xl font-bold">My Notes</h1>

      <BaseButton className="ml-auto p-2" onClick={addNewNote}>
        <RiAddFill className="h-8 w-8" />
      </BaseButton>
    </header>
  );
};

export default SidebarHeader;
