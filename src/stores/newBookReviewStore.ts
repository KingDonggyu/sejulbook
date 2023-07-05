import { create } from 'zustand';
import type { Book } from 'book';
import type {
  Content,
  NewBookReview,
  PublishOption,
  Rating,
  Sejul,
  Thumbnail,
} from 'bookReview';
import type { Tag } from 'tag';
import type { GetCategoryResponse } from 'category';

const initlializedBook: Book = {
  title: '',
  thumbnail: undefined,
  authors: [],
  publisher: '',
  datetime: '',
};

const initlializedBookReview: NewBookReview = {
  id: undefined,
  book: initlializedBook,
  thumbnail: '',
  category: { id: 1, category: '' },
  rating: 3,
  tags: [],
  sejul: '',
  content: '',
};

interface BookReviewState {
  bookReview: NewBookReview;
  setBook: (book: Book) => void;
  setThumbnail: (thumbnail: Thumbnail) => void;
  setCategory: (category: GetCategoryResponse) => void;
  setRating: (rating: Rating) => void;
  setTags: (tags: Tag[]) => void;
  setSejul: (sejul: Sejul) => void;
  setContent: (content: Content) => void;
  setPublishInfo: (publishInfo: PublishOption) => void;
  setBookReivew: (bookReview: NewBookReview) => void;
  initBookReview: () => void;
}

const bookReviewStore = create<BookReviewState>((set) => ({
  bookReview: initlializedBookReview,

  initBookReview: () => {
    set({ bookReview: initlializedBookReview });
  },

  setBook: (book) => {
    set((state) => ({
      bookReview: {
        ...state.bookReview,
        book,
        thumbnail: book.thumbnail || '',
      },
    }));
  },

  setThumbnail: (thumbnail) => {
    set((state) => ({ bookReview: { ...state.bookReview, thumbnail } }));
  },

  setCategory: (category) => {
    set((state) => ({ bookReview: { ...state.bookReview, category } }));
  },

  setRating: (rating) => {
    set((state) => ({ bookReview: { ...state.bookReview, rating } }));
  },

  setTags: (tags) => {
    set((state) => ({ bookReview: { ...state.bookReview, tags } }));
  },

  setSejul: (sejul) => {
    set((state) => ({ bookReview: { ...state.bookReview, sejul } }));
  },

  setContent: (content) => {
    set((state) => ({ bookReview: { ...state.bookReview, content } }));
  },

  setPublishInfo: (publishInfo) => {
    set((state) => ({ bookReview: { ...state.bookReview, ...publishInfo } }));
  },

  setBookReivew: (bookReview: NewBookReview) => {
    set({ bookReview });
  },
}));

export default bookReviewStore;
