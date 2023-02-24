import { create } from 'zustand';
import {
  BookReview,
  Category,
  Content,
  PublishInfo,
  Rating,
  Sejul,
  Tag,
  TagList,
} from '@/types/features/bookReview';
import { Book, BookThumbnail } from '@/types/features/book';

const initlializedBook: Book = {
  isbn: '',
  title: '',
  thumbnail: undefined,
  authors: [],
  publisher: '',
  datetime: '',
};

const initlializedBookReview: BookReview = {
  book: initlializedBook,
  thumbnail: undefined,
  category: null,
  rating: 3,
  tag: new Set<Tag>(),
  sejul: '',
  content: '',
};

interface BookReviewState {
  bookReview: BookReview;
  setBook: (book: Book) => void;
  setThumbnail: (thumbnail: BookThumbnail) => void;
  setCategory: (category: Category) => void;
  setRating: (rating: Rating) => void;
  setTag: (tag: TagList) => void;
  setSejul: (sejul: Sejul) => void;
  setContent: (content: Content) => void;
  setPublishInfo: (publishInfo: PublishInfo) => void;
  setBookReivew: (bookReview: BookReview) => void;
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

  setBookReivew: (bookReview: BookReview) => {
    set({ bookReview });
  },
}));

export default bookReviewStore;
