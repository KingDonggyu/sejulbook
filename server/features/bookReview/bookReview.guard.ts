import { bookReviewError } from 'server/constants/message';
import { HttpFailed } from 'server/types/http';
import BookReviewDTO from './bookReview.dto';

class BookReviewGuard {
  private bookReview: Partial<BookReviewDTO>;

  constructor(bookReview: Partial<BookReviewDTO>) {
    this.bookReview = bookReview;
  }

  checkEmptyBook(): HttpFailed | false {
    if (this.bookReview.bookname) {
      return false;
    }
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_BOOK,
    };
  }

  checkEmptySejul(): HttpFailed | false {
    if (this.bookReview.sejul) {
      return false;
    }
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_SEJUL,
    };
  }

  checkEmptyThumbnail(): HttpFailed | false {
    if (this.bookReview.thumbnail) {
      return false;
    }
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_THUMBNAIL,
    };
  }

  checkEmptyCategory(): HttpFailed | false {
    if (!this.bookReview.categoryId || this.bookReview.categoryId > 1) {
      return false;
    }
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_CATEGORY,
    };
  }

  checkEmptyRating(): HttpFailed | false {
    if (this.bookReview.rating) {
      return false;
    }
    return {
      error: true,
      code: 400,
      message: bookReviewError.EMPTY_RATING,
    };
  }

  checkReachedRatingLimit(): HttpFailed | false {
    const isEmptyRating = this.checkEmptyRating();

    if (isEmptyRating) {
      return isEmptyRating;
    }

    if (
      this.bookReview.rating &&
      this.bookReview.rating > 0 &&
      this.bookReview.rating < 6
    ) {
      return false;
    }

    return {
      error: true,
      code: 400,
      message: bookReviewError.LIMIT_REACHED_RATING,
    };
  }

  checkInvalidPublish(): HttpFailed | false {
    const result =
      this.checkEmptyBook() ||
      this.checkEmptySejul() ||
      this.checkEmptyThumbnail() ||
      this.checkEmptyCategory() ||
      this.checkReachedRatingLimit();

    if (result) {
      return result;
    }

    return false;
  }
}

export default BookReviewGuard;
