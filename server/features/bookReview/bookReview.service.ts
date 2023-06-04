import { bookReviewError, userError } from 'server/constants/message';
import { HttpResponse } from 'server/types/http';

import CategoryDTO, { Category } from '../category/category.dto';
import { UserName } from '../user/user.dto';
import BookReviewDTO, { BookReviewId } from './bookReview.dto';

import bookReviewModel from './bookReview.model';
import userModel from '../user/user.model';
import categoryModel from '../category/category.model';
import commentModel from '../comment/comment.model';
import likeModel from '../like/like.model';
import tagModel from '../tag/tag.model';

import BookReviewGuard from './bookReview.guard';
import formatEntityToDTO from './utils/formatEntityToDTO';
import formatDTOToEntity from './utils/formatDTOToEntity';
// import getCurrTwoMonthDate from './utils/getCurrTwoMonthDate';
import getMaxBookReviewId from './utils/getMaxBookReviewId';
import TagDTO from '../tag/tag.dto';
import getSQLFormattedDate from './utils/getSQLFormattedDate';

interface BookReviewSummary
  extends Pick<
    BookReviewDTO,
    'id' | 'bookname' | 'sejul' | 'thumbnail' | 'createdAt'
  > {
  likeCount: number;
  commentCount: number;
}

type ExtendedBookReviewSummary = {
  writer: UserName;
} & Omit<BookReviewSummary, 'likeCount' | 'commentCount'>;

type DraftSavedBookReview = Pick<
  BookReviewDTO,
  'id' | 'bookname' | 'createdAt'
>;

interface PublishedBookReview extends BookReviewDTO {
  writer: UserName;
  category: Category;
}

interface FeedFollowingBookReview
  extends Pick<BookReviewDTO, 'id' | 'sejul' | 'thumbnail' | 'userId'> {
  writer: UserName;
  likeCount: number;
  commentCount: number;
}

const bookReviewService = {
  getAllBookReviewId: async (): Promise<
    HttpResponse<Pick<BookReviewDTO, 'id'>[]>
  > => {
    const data = await bookReviewModel.getAllBookReviewId();
    return { error: false, data };
  },

  getMostLikeBookReviewList: async (): Promise<
    HttpResponse<ExtendedBookReviewSummary[]>
  > => {
    // const twoMonthDateInfo = getCurrTwoMonthDate();
    const bookReviewList = await bookReviewModel.getMostLikeBookReviewList();

    const promises = bookReviewList.map(
      async ({
        user_id,
        ...bookReview
      }): Promise<ExtendedBookReviewSummary> => {
        const writer = await userModel.getUserName({ id: user_id });

        return {
          id: bookReview.id,
          bookname: bookReview.bookname,
          sejul: bookReview.sejul,
          thumbnail: bookReview.thumbnail,
          createdAt: bookReview.datecreated,
          writer: writer || '',
        };
      },
    );

    const data = await Promise.all(promises);

    return { error: false, data };
  },

  getLatestBookReviewList: async (): Promise<
    HttpResponse<ExtendedBookReviewSummary[]>
  > => {
    const bookReviewList = await bookReviewModel.getLatestBookReviewList();

    const promises = bookReviewList.map(
      async ({
        user_id,
        ...bookReview
      }): Promise<ExtendedBookReviewSummary> => {
        const writer = await userModel.getUserName({ id: user_id });

        return {
          id: bookReview.id,
          bookname: bookReview.bookname,
          sejul: bookReview.sejul,
          thumbnail: bookReview.thumbnail,
          createdAt: bookReview.datecreated,
          writer: writer || '',
        };
      },
    );

    const data = await Promise.all(promises);

    return { error: false, data };
  },

  getFollowingBookReviewList: async ({
    userId,
  }: Pick<BookReviewDTO, 'userId'>): Promise<
    HttpResponse<ExtendedBookReviewSummary[]>
  > => {
    const bookReviewList = await bookReviewModel.getFollowingBookReviewList({
      user_id: userId,
    });

    const promises = bookReviewList.map(
      async ({
        user_id,
        ...bookReview
      }): Promise<ExtendedBookReviewSummary> => {
        const writer = await userModel.getUserName({ id: user_id });

        return {
          id: bookReview.id,
          bookname: bookReview.bookname,
          sejul: bookReview.sejul,
          thumbnail: bookReview.thumbnail,
          createdAt: bookReview.datecreated,
          writer: writer || '',
        };
      },
    );

    const data = await Promise.all(promises);

    return { error: false, data };
  },

  getPagingBookReviewList: async ({
    bookname,
    maxId,
  }: Pick<BookReviewDTO, 'bookname'> & {
    maxId: BookReviewId | null;
  }): Promise<HttpResponse<FeedFollowingBookReview[]>> => {
    const bookReviewId = await getMaxBookReviewId(maxId, () =>
      bookReviewModel.getMaxBookReviewId({ bookname }),
    );

    if (!bookReviewId) {
      return { error: false, data: [] };
    }

    const bookReviewList = await bookReviewModel.getPagingBookReviewList({
      bookname,
      maxId: bookReviewId,
    });

    const promises = await bookReviewList.map(
      async ({ id, ...bookReview }): Promise<FeedFollowingBookReview> => {
        const [likeCount, commentCount] = await Promise.all([
          likeModel.getLikeCount({ sejulbook_id: id }),
          commentModel.getCommentCount({ sejulbook_id: id }),
        ]);

        return {
          id,
          likeCount,
          commentCount,
          sejul: bookReview.sejul,
          thumbnail: bookReview.thumbnail,
          userId: bookReview.user_id,
          writer: bookReview.nick || '',
        };
      },
    );

    const data = await Promise.all(promises);

    return { error: false, data };
  },

  getPagingBookReviewListByCategory: async ({
    category,
    maxId,
  }: Pick<CategoryDTO, 'category'> & {
    maxId: BookReviewId | null;
  }): Promise<HttpResponse<FeedFollowingBookReview[]>> => {
    const categoryId = await categoryModel.getCategoryId({ category });

    const bookReviewId = await getMaxBookReviewId(maxId, () =>
      bookReviewModel.getMaxBookReviewIdByCategory({ category_id: categoryId }),
    );

    if (!bookReviewId) {
      return { error: false, data: [] };
    }

    const bookReviewList =
      await bookReviewModel.getPagingBookReviewListByCategory({
        category_id: categoryId,
        maxId: bookReviewId,
      });

    const promises = await bookReviewList.map(
      async ({ id, ...bookReview }): Promise<FeedFollowingBookReview> => {
        const [likeCount, commentCount] = await Promise.all([
          likeModel.getLikeCount({ sejulbook_id: id }),
          commentModel.getCommentCount({ sejulbook_id: id }),
        ]);

        return {
          id,
          likeCount,
          commentCount,
          sejul: bookReview.sejul,
          thumbnail: bookReview.thumbnail,
          userId: bookReview.user_id,
          writer: bookReview.nick || '',
        };
      },
    );

    const data = await Promise.all(promises);

    return { error: false, data };
  },

  getPagingBookReviewListByTag: async ({
    tag,
    maxId,
  }: Pick<TagDTO, 'tag'> & { maxId: BookReviewId | null }): Promise<
    HttpResponse<FeedFollowingBookReview[]>
  > => {
    const bookReviewId = await getMaxBookReviewId(maxId, () =>
      tagModel.getMaxBookReviewIdByTag({ tag }),
    );

    if (!bookReviewId) {
      return { error: false, data: [] };
    }

    const bookReviewList = await bookReviewModel.getPagingBookReviewListByTag({
      tag,
      maxId: bookReviewId,
    });

    const promises = await bookReviewList.map(
      async ({
        id,
        user_id,
        ...bookReview
      }): Promise<FeedFollowingBookReview> => {
        const [writer, likeCount, commentCount] = await Promise.all([
          userModel.getUserName({ id: user_id }),
          likeModel.getLikeCount({ sejulbook_id: id }),
          commentModel.getCommentCount({ sejulbook_id: id }),
        ]);

        return {
          id,
          likeCount,
          commentCount,
          userId: user_id,
          writer: writer || '',
          sejul: bookReview.sejul,
          thumbnail: bookReview.thumbnail,
        };
      },
    );

    const data = await Promise.all(promises);

    return { error: false, data };
  },

  getPagingFollowingBookReviewList: async ({
    userId,
    maxId,
  }: Pick<BookReviewDTO, 'userId'> & { maxId: BookReviewId | null }): Promise<
    HttpResponse<FeedFollowingBookReview[]>
  > => {
    const bookReviewId = await getMaxBookReviewId(maxId, () =>
      bookReviewModel.getMaxFollowingBookReviewId({ user_id: userId }),
    );

    if (!bookReviewId) {
      return { error: false, data: [] };
    }

    const bookReviewList =
      await bookReviewModel.getPagingFollowingBookReviewList({
        user_id: userId,
        maxId: bookReviewId,
      });

    const promises = await bookReviewList.map(
      async ({
        id,
        user_id,
        ...bookReview
      }): Promise<FeedFollowingBookReview> => {
        const [writer, likeCount, commentCount] = await Promise.all([
          userModel.getUserName({ id: user_id }),
          likeModel.getLikeCount({ sejulbook_id: id }),
          commentModel.getCommentCount({ sejulbook_id: id }),
        ]);

        return {
          id,
          likeCount,
          commentCount,
          userId: user_id,
          writer: writer || '',
          sejul: bookReview.sejul,
          thumbnail: bookReview.thumbnail,
        };
      },
    );

    const data = await Promise.all(promises);

    return { error: false, data };
  },

  getBookReviewList: async ({
    userId,
  }: Pick<BookReviewDTO, 'userId'>): Promise<
    HttpResponse<BookReviewSummary[]>
  > => {
    const bookReviewList = await bookReviewModel.getBookReviewList({
      user_id: userId,
    });

    const promises = bookReviewList.map(
      async ({ id, ...bookReview }): Promise<BookReviewSummary> => {
        const [likeCount, commentCount] = await Promise.all([
          likeModel.getLikeCount({ sejulbook_id: id }),
          commentModel.getCommentCount({ sejulbook_id: id }),
        ]);

        return {
          id,
          likeCount,
          commentCount,
          bookname: bookReview.bookname,
          sejul: bookReview.sejul,
          thumbnail: bookReview.thumbnail,
          createdAt: bookReview.datecreated,
        };
      },
    );

    const data = await Promise.all(promises);

    return { error: false, data };
  },

  getDraftSavedList: async ({
    userId,
  }: Pick<BookReviewDTO, 'userId'>): Promise<
    HttpResponse<DraftSavedBookReview[]>
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
  }: Pick<BookReviewDTO, 'id'>): Promise<HttpResponse<PublishedBookReview>> => {
    const bookReviewData = await bookReviewModel.getBookReivew({ id });

    if (!bookReviewData) {
      return {
        error: true,
        code: 404,
        message: bookReviewError.NOT_EXIST_BOOKREVIEW,
      };
    }

    const bookReview = formatEntityToDTO(bookReviewData);

    const [userName, { category }] = await Promise.all([
      userModel.getUserName({ id: bookReview.userId }),
      categoryModel.getCategory({ id: bookReview.categoryId }),
    ]);

    if (!userName) {
      return {
        error: true,
        code: 400,
        message: userError.USER_NOT_FOUND,
      };
    }

    const data: PublishedBookReview = {
      ...bookReview,
      writer: userName,
      category,
    };

    return { error: false, data };
  },

  draftSaveBookReview: async (
    bookReview: Omit<BookReviewDTO, 'id' | 'createdAt'> & { id?: BookReviewId },
  ): Promise<HttpResponse<BookReviewId>> => {
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

    // 임시저장 독후감 개수 확인
    const draftSavedListResponse = await bookReviewService.getDraftSavedList({
      userId: bookReview.userId,
    });

    if (draftSavedListResponse.error) {
      return draftSavedListResponse;
    }

    if (draftSavedListResponse.data.length === 10) {
      return {
        error: true,
        code: 400,
        message: bookReviewError.LIMIT_DRAFT_SAVE,
      };
    }

    // 독후감 임시저장
    const data = await bookReviewModel.createBookReview(entityData);
    return { error: false, data };
  },

  publishBookReview: async (
    bookReview: Omit<BookReviewDTO, 'id' | 'createdAt'> & {
      id?: BookReviewId;
      createdAt?: string;
    },
  ): Promise<HttpResponse<BookReviewId>> => {
    const bookReviewGuard = new BookReviewGuard(bookReview);
    const guardResult = bookReviewGuard.checkInvalidPublish();

    if (guardResult) {
      return guardResult;
    }

    const entityData = formatDTOToEntity({
      ...bookReview,
      isDraftSave: false,
    });

    // 임시저장 독후감 발행 또는 독후감 수정
    if (bookReview.id) {
      await bookReviewModel.updateBookReview({
        ...entityData,
        id: bookReview.id,
        datecreated: bookReview.createdAt
          ? getSQLFormattedDate(bookReview.createdAt)
          : undefined,
      });

      return { error: false, data: bookReview.id };
    }

    // 독후감 발행
    const data = await bookReviewModel.createBookReview(entityData);
    return { error: false, data };
  },

  deletedBookReview: async ({
    id,
  }: Pick<BookReviewDTO, 'id'>): Promise<HttpResponse<undefined>> => {
    try {
      await Promise.all([
        commentModel.deleteComments({ sejulbook_id: id }),
        tagModel.deleteTags({ sejulbook_id: id }),
        likeModel.deleteAllLikes({ sejulbook_id: id }),
        bookReviewModel.deleteBookReview({ id }),
      ]).catch;

      return { error: false, data: undefined };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: bookReviewError.NOT_DELETED_BOOKREVIEW,
      };
    }
  },
};

export default bookReviewService;
