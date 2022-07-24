import AutoResizeTextarea from '@/components/AutoResizeTextarea';
import useUserNotes from '@/hooks/useUserNotes';
import { atomNotesSelected } from '@/stores/notesStore';
import { useAtomValue } from 'jotai';

const NoteViewerEditor = () => {
  const selectedNote = useAtomValue(atomNotesSelected);
  const { updateNote } = useUserNotes();

  return (
    <div className="flex flex-1 flex-col py-4">
      <AutoResizeTextarea
        parentClass="text-3xl min-h-[72px] md:min-h-[116px] font-medium"
        className="whitespace-pre-wrap break-all bg-transparent p-4 pb-5 outline-none transition-colors placeholder:text-slate-500 md:p-10"
        placeholder="Title"
        value={selectedNote?.title}
        onChange={(e) =>
          selectedNote &&
          updateNote(
            { title: e.target.value.replaceAll('\n', '') },
            selectedNote,
          )
        }
      />

      <hr className="mx-4 border-slate-700 md:mx-10" />

      <textarea
        placeholder="Content"
        className="flex-1 resize-none bg-transparent p-4 pb-[70vh] outline-none transition-colors placeholder:text-slate-500 md:p-10"
        spellCheck="false"
        value={selectedNote?.body || ''}
        onChange={(e) =>
          selectedNote && updateNote({ body: e.target.value }, selectedNote)
        }
      />
    </div>
  );
};

export default NoteViewerEditor;
