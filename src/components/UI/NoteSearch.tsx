import BaseInput from '@/components/UI/BaseInput';
import { memo } from 'react';

export interface NoteSearchProps {
  query: string;
  setQuery: (newQuery: string) => void;
}

const NoteSearch = ({ query, setQuery }: NoteSearchProps) => {
  return (
    <div className="p-1">
      <BaseInput
        className="w-full"
        type="text"
        placeholder="Search notes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default memo(NoteSearch);
