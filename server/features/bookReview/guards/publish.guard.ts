import { bookReviewError } from 'server/constants/message';
import { HttpFailed } from 'server/types/http';
import BookReviewDTO from '../bookReview.dto';

const publishGuard = (
  bookReview: Partial<BookReviewDTO>,
): HttpFailed | null => {
  if (!bookReview.bookname) {
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_BOOK,
    };
  }

  if (!bookReview.sejul) {
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_SEJUL,
    };
  }

  if (!bookReview.thumbnail) {
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_THUMBNAIL,
    };
  }

  if (!bookReview.categoryId) {
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_CATEGORY,
    };
  }

  if (!bookReview.rating) {
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_RATING,
    };
  }

  if (bookReview.rating < 1 || bookReview.rating > 5) {
    return {
      error: true,
      code: 400,
      message: bookReviewError.LIMIT_REACHED_RATING,
    };
  }

  return null;
};

export default publishGuard;
