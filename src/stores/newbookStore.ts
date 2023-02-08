import { create } from 'zustand';
import { BookReview } from '@/types/domain/bookReview';

interface NewBookState {
  newbook: BookReview;
  setNewBook: (nextNewbook: Partial<BookReview>) => void;
}

const newbookStore = create<NewBookState>((set) => ({
  newbook: {
    title: '',
    authors: [''],
    thumbnail: '',
    datetime: '',
    publisher: '',
    category: '',
  },

  setNewBook: (nextNewbook: Partial<BookReview>) => {
    set((state) => ({ newbook: { ...state.newbook, ...nextNewbook } }));
  },
}));

export default newbookStore;
