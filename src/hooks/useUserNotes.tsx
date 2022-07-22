import { addUserNote, getUserNotes } from '@/services/firebase';
import { atomNotes, atomNotesSelected } from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';

const useUserNotes = () => {
  const user = useAtomValue(atomUser);
  const setNotes = useSetAtom(atomNotes);
  const setSelectedNotes = useSetAtom(atomNotesSelected);

  const fetchNotes = async () => {
    if (user) {
      const notes = await getUserNotes(user);
      notes && setNotes(notes);

      return;
    }

    setNotes([]);
    console.error('Unauthorized!');
  };

  const addNote = async () => {
    if (user) {
      const localId = nanoid();
      const newNotes = {
        title: '',
        body: '',
        uid: user.uid,
        updatedAt: new Date().toISOString(),
      };

      // Add to local notes
      const localNote = { id: localId, ...newNotes };
      setNotes((prevNotes) => [...prevNotes, localNote]);
      setSelectedNotes(localNote);

      // add to firestore
      const storedNote = await addUserNote(newNotes, user);

      // Update local note
      if (storedNote) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === localId ? { ...note, id: storedNote.id } : note,
          ),
        );

        setSelectedNotes((prevNotes) =>
          prevNotes?.id === localId ? storedNote : prevNotes,
        );
      }
      return;
    }

    console.error('Unauthorized!');
  };

  return { fetchNotes, addNote };
};

export default useUserNotes;
