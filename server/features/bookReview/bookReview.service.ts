import { bookReviewError, userError } from 'server/constants/message';
import { HttpSuccess, HttpFailed } from 'server/types/http';
import { Category } from '../category/category.dto';
import categoryModel from '../category/category.model';
import commentModel from '../comment/comment.model';
import likeModel from '../like/like.model';
import { UserName } from '../user/user.dto';
import userModel from '../user/user.model';
import BookReviewDTO, { BookReviewId } from './bookReview.dto';
import bookReviewModel from './bookReview.model';
import formatEntityToDTO from './utils/formatEntityToDTO';
import formatDTOToEntity from './utils/formatDTOToEntity';

type BookReviewSummary = Pick<
  BookReviewDTO,
  'id' | 'bookname' | 'sejul' | 'thumbnail'
>;

type DraftSavedBookReview = Pick<
  BookReviewDTO,
  'id' | 'bookname' | 'createdAt'
>;

interface PublishedBookReview extends BookReviewDTO {
  writer: UserName;
  category: Category;
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

  getDraftSavedList: async ({
    userId,
  }: Pick<BookReviewDTO, 'userId'>): Promise<
    HttpSuccess<DraftSavedBookReview[]> | HttpFailed
  > => {
    const bookReviewList = await bookReviewModel.getDraftSavedList({
      user_id: userId,
    });

    return {
      error: false,
      data: bookReviewList.map(({ id, bookname, datecreated }) => ({
        id,
        bookname,
        createdAt: datecreated,
      })),
    };
  },

  getBookReivew: async ({
    id,
  }: Pick<BookReviewDTO, 'id'>): Promise<
    HttpSuccess<PublishedBookReview> | HttpFailed
  > => {
    const bookReviewData = await bookReviewModel.getBookReivew({ id });

    if (!bookReviewData) {
      return {
        error: true,
        code: 404,
        message: bookReviewError.NOT_EXIST_BOOKREVIEW,
      };
    }

    const bookReview = formatEntityToDTO(bookReviewData);
    const userName = await userModel.getUserName({ id: bookReview.userId });

    if (!userName) {
      return {
        error: true,
        code: 400,
        message: userError.USER_NOT_FOUND,
      };
    }

    const { category } = await categoryModel.getCategory({
      id: bookReview.categoryId,
    });

    const { count: likeCount } = await likeModel.getLikeCount({
      sejulbook_id: id,
    });

    const data: PublishedBookReview = {
      ...bookReview,
      writer: userName,
      category,
      likeCount,
    };

    return { error: false, data };
  },

  draftSaveBookReview: async (
    bookReview: Omit<BookReviewDTO, 'id'>,
  ): Promise<HttpSuccess<BookReviewId> | HttpFailed> => {
    if (!bookReview.bookname) {
      return {
        error: true,
        code: 400,
        message: bookReviewError.EMPTY_BOOK,
      };
    }

    if (bookReview.rating < 1 || bookReview.rating > 5) {
      return {
        error: true,
        code: 400,
        message: bookReviewError.LIMIT_REACHED_RATING,
      };
    }

    const data = await bookReviewModel.createBookReview(
      formatDTOToEntity({
        ...bookReview,
        isDraftSave: true,
        sejul: bookReview.sejul || '',
        thumbnail: bookReview.thumbnail || '',
        categoryId: bookReview.categoryId || 1,
        rating: bookReview.rating || 3,
      }),
    );

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

    const data = await bookReviewModel.createBookReview(
      formatDTOToEntity({
        ...bookReview,
        isDraftSave: false,
      }),
    );

    return { error: false, data };
  },
};

export default bookReviewService;
