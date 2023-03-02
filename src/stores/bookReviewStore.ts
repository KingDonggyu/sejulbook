import { create } from 'zustand';
import {
  NewBookReview,
  Category,
  Content,
  PublishInfo,
  Rating,
  Sejul,
} from '@/types/features/bookReview';
import { Tag, TagList } from '@/types/features/tag';
import { Book, BookThumbnail } from '@/types/features/book';

const initlializedBook: Book = {
  isbn: '',
  title: '',
  thumbnail: undefined,
  authors: [],
  publisher: '',
  datetime: '',
};

const initlializedBookReview: NewBookReview = {
  book: initlializedBook,
  thumbnail: undefined,
  category: { id: 0, category: '' },
  rating: 3,
  tag: new Set<Tag>(),
  sejul: '',
  content: '',
};

interface BookReviewState {
  bookReview: NewBookReview;
  setBook: (book: Book) => void;
  setThumbnail: (thumbnail: BookThumbnail) => void;
  setCategory: (category: Category) => void;
  setRating: (rating: Rating) => void;
  setTag: (tag: TagList) => void;
  setSejul: (sejul: Sejul) => void;
  setContent: (content: Content) => void;
  setPublishInfo: (publishInfo: PublishInfo) => void;
  setBookReivew: (bookReview: NewBookReview) => void;
}

const bookReviewStore = create<BookReviewState>((set) => ({
  bookReview: initlializedBookReview,

  setBook: (book: Book) => {
    set((state) => ({ bookReview: { ...state.bookReview, book } }));
  },

  setThumbnail: (thumbnail: BookThumbnail) => {
    set((state) => ({ bookReview: { ...state.bookReview, thumbnail } }));
  },

  setCategory: (category: Category) => {
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

  setPublishInfo: (publishInfo: PublishInfo) => {
    set((state) => ({ bookReview: { ...state.bookReview, ...publishInfo } }));
  },

  setBookReivew: (bookReview: NewBookReview) => {
    set({ bookReview });
  },
}));

export default bookReviewStore;
