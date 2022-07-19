import { atomNotesSearch } from '@/stores/notesStore';
import { useAtom } from 'jotai';

const NoteSearch = () => {
  const [search, setSearch] = useAtom(atomNotesSearch);
  return (
    <div className="p-1">
      <input
        className="h-9 w-full rounded border border-slate-700 bg-slate-900/40 py-1 px-2 outline-none focus:border-slate-500"
        type="text"
        placeholder="Search notes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default NoteSearch;
