import { bookReviewError } from 'server/constants/message';
import { HttpSuccess, HttpFailed } from 'server/types/http';
import categoryModel from '../category/category.model';
import commentModel from '../comment/comment.model';
import likeModel from '../like/like.model';
import BookReviewDTO, { BookReviewId } from './bookReview.dto';
import bookReviewModel from './bookReview.model';
import formatEntityToDTO from './utils/formatEntityToDTO';

type BookReviewSummary = Pick<
  BookReviewDTO,
  'id' | 'bookname' | 'sejul' | 'thumbnail'
>;

interface PublishedBookReview
  extends Omit<BookReviewDTO, 'categoryId' | 'isDraftSave'> {
  category: string;
  likeCount: number;
}

const bookReviewService = {
  getBookReviewList: async ({
    userId,
  }: Pick<BookReviewDTO, 'userId'>): Promise<
    HttpSuccess<BookReviewSummary[]> | HttpFailed
  > => {
    const bookReviewList = await bookReviewModel.getBookReviewList({
      user_id: userId,
    });

    const promises = bookReviewList.map(
      async ({ id, ...bookReviewSummary }) => {
        const likeResult = await likeModel.getLikeCount({
          sejulbook_id: id,
        });

        const commentResult = await commentModel.getCommentCount({
          sejulbook_id: id,
        });

        return {
          id,
          likeCount: likeResult.count,
          commentCount: commentResult.count,
          ...bookReviewSummary,
        };
      },
    );

    const data = await Promise.all(promises);

    return { error: false, data };
  },

  getBookReivew: async ({
    id,
  }: Pick<BookReviewDTO, 'id'>): Promise<
    HttpSuccess<PublishedBookReview> | HttpFailed
  > => {
    const [bookReviewData] = await bookReviewModel.getBookReivew({ id });

    if (!bookReviewData) {
      return {
        error: true,
        code: 404,
        message: bookReviewError.NOT_EXIST_BOOKREVIEW,
      };
    }

    const bookReview = formatEntityToDTO(bookReviewData);

    if (bookReview.isDraftSave) {
      return {
        error: true,
        code: 400,
        message: bookReviewError.NOT_PUBLISHED_BOOKREVIEW,
      };
    }

    const { category } = await categoryModel.getCategory({
      id: bookReview.categoryId,
    });

    const { count: likeCount } = await likeModel.getLikeCount({
      sejulbook_id: id,
    });

    delete (bookReview as Partial<BookReviewDTO>).categoryId;
    delete (bookReview as Partial<BookReviewDTO>).isDraftSave;

    const data: PublishedBookReview = {
      ...bookReview,
      category,
      likeCount,
    };

    return { error: false, data };
  },

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
