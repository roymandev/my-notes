import { atom } from 'jotai';

export const atomIsMobile = atom(false);

export const atomModal = atom<'delete-note' | null>(null);
export const atomModalClose = atom(null, (get, set) => set(atomModal, null));
