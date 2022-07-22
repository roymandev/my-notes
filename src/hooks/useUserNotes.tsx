import { getUserNotes } from '@/services/firebase';
import { atomNotes } from '@/stores/notesStore';
import { atomUser } from '@/stores/userStore';
import { useAtomValue, useSetAtom } from 'jotai';

const useUserNotes = () => {
  const user = useAtomValue(atomUser);
  const setNotes = useSetAtom(atomNotes);

  const fetchNotes = async () => {
    if (user) {
      const notes = await getUserNotes(user);
      notes && setNotes(notes);

      return;
    }

    setNotes([]);
    console.error('Unauthorized!');
  };

  return { fetchNotes };
};

export default useUserNotes;
