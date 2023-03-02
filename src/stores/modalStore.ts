import { create } from 'zustand';

interface ModalState {
  modalSet: Set<string>;
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
}

const modalStore = create<ModalState>((set) => ({
  modalSet: new Set<string>(),

  openModal: (key: string) => {
    set((state) => {
      const modalSet = new Set(state.modalSet);
      modalSet.add(key);
      return { modalSet };
    });
  },

  closeModal: (key: string) => {
    set((state) => {
      const modalSet = new Set(state.modalSet);
      modalSet.delete(key);
      return { modalSet };
    });
  },
}));

export default modalStore;
