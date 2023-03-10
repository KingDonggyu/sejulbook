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
import BookReviewGuard from './bookReview.guard';

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
    bookReview: Omit<BookReviewDTO, 'id' | 'createdAt'> & { id?: BookReviewId },
  ): Promise<HttpSuccess<BookReviewId> | HttpFailed> => {
    const bookReviewGuard = new BookReviewGuard(bookReview);
    const result =
      bookReviewGuard.checkEmptyBook() ||
      bookReviewGuard.checkReachedRatingLimit();

    if (result) {
      return result;
    }

    const entityData = formatDTOToEntity({
      ...bookReview,
      isDraftSave: true,
      sejul: bookReview.sejul || '',
      thumbnail: bookReview.thumbnail || '',
      categoryId: bookReview.categoryId || 1,
      rating: bookReview.rating || 3,
    });

    // 독후감 재임시저장
    if (bookReview.id) {
      await bookReviewModel.updateBookReview({
        ...entityData,
        id: bookReview.id,
      });

      return { error: false, data: bookReview.id };
    }

    // 독후감 임시저장
    const data = await bookReviewModel.createBookReview(entityData);
    return { error: false, data };
  },

  publishBookReview: async (
    bookReview: Omit<BookReviewDTO, 'id' | 'createdAt'> & { id?: BookReviewId },
  ): Promise<HttpSuccess<BookReviewId> | HttpFailed> => {
    const bookReviewGuard = new BookReviewGuard(bookReview);
    const guardResult = bookReviewGuard.checkInvalidPublish();

    if (guardResult) {
      return guardResult;
    }

    const entityData = formatDTOToEntity({
      ...bookReview,
      isDraftSave: false,
    });

    // 임시저장 독후감 발행
    if (bookReview.id) {
      await bookReviewModel.updateBookReview({
        ...entityData,
        id: bookReview.id,
      });

      return { error: false, data: bookReview.id };
    }

    // 독후감 발행
    const data = await bookReviewModel.createBookReview(entityData);
    return { error: false, data };
  },
};

export default bookReviewService;
