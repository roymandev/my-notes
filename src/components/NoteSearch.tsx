import BaseInput from '@/components/BaseInput';
import { atomNotesSearch } from '@/stores/notesStore';
import { useAtom } from 'jotai';

const NoteSearch = () => {
  const [search, setSearch] = useAtom(atomNotesSearch);
  return (
    <div className="p-1">
      <BaseInput
        className="w-full"
        type="text"
        placeholder="Search notes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default NoteSearch;
