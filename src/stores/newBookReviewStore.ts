import { create } from 'zustand';
import type { Book } from 'book';
import type {
  BookReviewToPublish,
  Content,
  Id,
  NewBookReview,
  PublishOption,
  Rating,
  Sejul,
  Thumbnail,
  UpdateBookReviewRequest,
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
  getBookReviewToPublish: (bookReview: NewBookReview) => BookReviewToPublish;
  getBookReviewToUpdate: (
    id: Id,
    bookReview: NewBookReview,
  ) => UpdateBookReviewRequest;
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

  getBookReviewToPublish: (bookReview) => ({
    id: bookReview.id,
    bookname: bookReview.book.title,
    authors: bookReview.book.authors.join(' '),
    publisher: bookReview.book.publisher,
    publication: bookReview.book.datetime,
    originThumbnail: bookReview.book.thumbnail,

    sejul: bookReview.sejul,
    content: bookReview.content,
    thumbnail: bookReview.thumbnail,
    categoryId: bookReview.category.id,
    rating: bookReview.rating,
    tags: bookReview.tags,
  }),

  getBookReviewToUpdate: (id, bookReview) => ({
    id,
    bookname: bookReview.book.title,
    authors: bookReview.book.authors.join(' '),
    publisher: bookReview.book.publisher,
    publication: bookReview.book.datetime,
    originThumbnail: bookReview.book.thumbnail,

    sejul: bookReview.sejul,
    content: bookReview.content,
    thumbnail: bookReview.thumbnail,
    categoryId: bookReview.category.id,
    rating: bookReview.rating,
    tags: bookReview.tags,
  }),
}));

export default bookReviewStore;
