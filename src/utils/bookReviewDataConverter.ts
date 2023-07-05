import { Book } from 'book';
import {
  BookReviewToPublish,
  GetPublishedBookReviewResponse,
  NewBookReview,
} from 'bookReview';

export const getPublishedBookReviewToBook = (
  bookReview: GetPublishedBookReviewResponse,
): Book => ({
  title: bookReview.bookname,
  authors: bookReview.authors.split(', '),
  publisher: bookReview.publisher,
  datetime: bookReview.publication,
  thumbnail: bookReview.originThumbnail,
});

export const getBookReviewToPublish = (
  bookReview: NewBookReview,
): BookReviewToPublish => ({
  id: bookReview.id,
  bookname: bookReview.book.title,
  authors: bookReview.book.authors.join(', '),
  publisher: bookReview.book.publisher,
  publication: bookReview.book.datetime,
  originThumbnail: bookReview.book.thumbnail,

  sejul: bookReview.sejul,
  content: bookReview.content,
  thumbnail: bookReview.thumbnail,
  categoryId: bookReview.category.id,
  rating: bookReview.rating,
  tags: bookReview.tags,
});
