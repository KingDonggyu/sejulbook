import { bookReviewError } from 'server/constants/message';
import { HttpSuccess, HttpFailed } from 'server/types/http';
import BookReviewDTO, { BookReviewId } from './bookReview.dto';
import bookReviewModel from './bookReview.model';

const bookReviewService = {
  publishBookReview: async (
    bookReview: Omit<BookReviewDTO, 'id'>,
  ): Promise<HttpSuccess<BookReviewId> | HttpFailed> => {
    if (!bookReview.bookname) {
      return {
        error: true,
        code: 400,
        message: bookReviewError.EMPTY_BOOK,
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

    const data = await bookReviewModel.createBookReview({
      ...bookReview,
      writer: bookReview.authors,
      grade: bookReview.rating,
      sejul: bookReview.sejul.replace(/"/g, '""'),
      sejulplus: bookReview.content.replace(/"/g, '""'),
      user_id: bookReview.userId,
      category_id: bookReview.categoryId,
      divide: bookReview.isDraftSave ? 0 : 1,
    });

    return { error: false, data };
  },
};

export default bookReviewService;
