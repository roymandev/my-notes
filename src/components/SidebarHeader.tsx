import BaseButton from '@/components/BaseButton';
import { atomNotesAdd } from '@/stores/notesStore';
import { useSetAtom } from 'jotai';
import { RiAddFill } from 'react-icons/ri';

const SidebarHeader = () => {
  const addNewNote = useSetAtom(atomNotesAdd);

  return (
    <header className="flex items-center p-1">
      <h1 className="px-2 py-1 text-xl font-bold">My Notes</h1>

      <BaseButton className="ml-auto p-2" onClick={addNewNote}>
        <RiAddFill className="h-5 w-5" />
      </BaseButton>
    </header>
  );
};

export default SidebarHeader;
