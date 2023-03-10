import { create } from 'zustand';
import {
  NewBookReview,
  Content,
  NewPublishInfo,
  Rating,
  Sejul,
} from '@/types/features/bookReview';
import { CategoryResponse } from '@/types/features/category';
import { Tag, TagList } from '@/types/features/tag';
import { Book, BookThumbnail } from '@/types/features/book';

const initlializedBook: Book = {
  title: '',
  thumbnail: undefined,
  authors: [],
  publisher: '',
  datetime: '',
};

const initlializedBookReview: NewBookReview = {
  book: initlializedBook,
  thumbnail: '',
  category: { id: 1, category: '' },
  rating: 3,
  tag: new Set<Tag>(),
  sejul: '',
  content: '',
};

interface BookReviewState {
  bookReview: NewBookReview;
  setBook: (book: Book) => void;
  setThumbnail: (thumbnail: BookThumbnail) => void;
  setCategory: (category: CategoryResponse) => void;
  setRating: (rating: Rating) => void;
  setTag: (tag: TagList) => void;
  setSejul: (sejul: Sejul) => void;
  setContent: (content: Content) => void;
  setPublishInfo: (publishInfo: NewPublishInfo) => void;
  setBookReivew: (bookReview: NewBookReview) => void;
  initBookReview: () => void;
}

const bookReviewStore = create<BookReviewState>((set) => ({
  bookReview: initlializedBookReview,

  setBook: (book: Book) => {
    set((state) => ({ bookReview: { ...state.bookReview, book } }));
  },

  setThumbnail: (thumbnail: BookThumbnail) => {
    set((state) => ({ bookReview: { ...state.bookReview, thumbnail } }));
  },

  setCategory: (category: CategoryResponse) => {
    set((state) => ({ bookReview: { ...state.bookReview, category } }));
  },

  setRating: (rating: Rating) => {
    set((state) => ({ bookReview: { ...state.bookReview, rating } }));
  },

  setTag: (tag: TagList) => {
    set((state) => ({ bookReview: { ...state.bookReview, tag } }));
  },

  setSejul: (sejul: Sejul) => {
    set((state) => ({ bookReview: { ...state.bookReview, sejul } }));
  },

  setContent: (content: Content) => {
    set((state) => ({ bookReview: { ...state.bookReview, content } }));
  },

  setPublishInfo: (publishInfo: NewPublishInfo) => {
    set((state) => ({ bookReview: { ...state.bookReview, ...publishInfo } }));
  },

  setBookReivew: (bookReview: NewBookReview) => {
    set({ bookReview });
  },

  initBookReview: () => {
    set({ bookReview: initlializedBookReview });
  },
}));

export default bookReviewStore;
