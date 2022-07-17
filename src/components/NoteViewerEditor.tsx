import AutoResizeTextarea from '@/components/AutoResizeTextarea';
import { atomNotesSelected, atomNotesSelectedWrite } from '@/stores/notesStore';
import { useAtomValue, useSetAtom } from 'jotai';

const NoteViewerEditor = () => {
  const selectedNote = useAtomValue(atomNotesSelected);
  const writeSelectedNote = useSetAtom(atomNotesSelectedWrite);

  return (
    <div className="flex flex-1 flex-col">
      <AutoResizeTextarea
        parentClass="text-2xl min-h-[100px]"
        className="bg-transparent p-10 pb-5 outline-none transition-colors placeholder:text-slate-500"
        placeholder="Title"
        value={selectedNote?.title}
        onChange={(e) => writeSelectedNote({ title: e.target.value })}
      />

      <hr className="mx-10 border-slate-700" />

      <textarea
        placeholder="Content"
        className="flex-1 resize-none bg-transparent p-10 pt-8 text-base outline-none transition-colors placeholder:text-slate-500"
        spellCheck="false"
        value={selectedNote?.body || ''}
        onChange={(e) => writeSelectedNote({ body: e.target.value })}
      />
    </div>
  );
};

export default NoteViewerEditor;
