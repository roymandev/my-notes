import { User } from 'firebase/auth';
import { atomWithStorage } from 'jotai/utils';

export const atomUser = atomWithStorage<User | null>('currentUser', null);
