import type {
  Id,
  UserId,
  CreateBookReviewReqeust,
  UpdateBookReviewRequest,
  GetFollowingBookReviewPageRequest,
  GetBookReviewPageByBookNameRequest,
  GetBookReviewPageByCategoryRequest,
  GetBookReviewPageByTagRequest,
  GetPublishedBookReviewResponse,
  HasBookReviewRequest,
} from 'bookReview';

import BookReviewService from '@/server/services/bookReview.service';
import HttpClient from '@/lib/HttpClient';

class BookReviewRepository extends HttpClient {
  private service: BookReviewService | null;

  private baseUrl = '/bookreview';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new BookReviewService() : null;
  }

  async checkIsMine({ userId, id }: HasBookReviewRequest) {
    if (!this.service) {
      throw new Error(
        'Client Side Redering 시 해당 method를 사용할 수 없습니다.',
      );
    }
    const isMine = await this.service.hasBookReview({ userId, id });
    return isMine;
  }

  async publish(bookReview: CreateBookReviewReqeust) {
    const data = await this.axiosInstance.post<never, { bookReviewId: Id }>(
      `${this.baseUrl}/publish`,
      bookReview,
    );
    return data;
  }

  async draftSave(bookReview: CreateBookReviewReqeust) {
    const data = await this.axiosInstance.post<never, { bookReviewId: Id }>(
      `${this.baseUrl}/draftsave`,
      bookReview,
    );
    return data;
  }

  async delete(id: Id, userId: UserId) {
    await this.axiosInstance.delete(`${this.baseUrl}/${id}`, {
      params: { userId },
    });
  }

  async updatePublished({
    id,
    userId,
    bookReview,
  }: {
    id: Id;
    userId: UserId;
    bookReview: UpdateBookReviewRequest;
  }) {
    await this.axiosInstance.put(`${this.baseUrl}/${id}`, bookReview, {
      params: { userId, isPublished: true },
    });
  }

  async updateDraftSaved({
    id,
    userId,
    bookReview,
  }: {
    id: Id;
    userId: UserId;
    bookReview: UpdateBookReviewRequest;
  }) {
    await this.axiosInstance.put(`${this.baseUrl}/${id}`, bookReview, {
      params: { userId, isPublished: false },
    });
  }

  async get(
    id: Id,
    isOnlyPublished = false,
  ): Promise<GetPublishedBookReviewResponse> {
    if (this.service) {
      const bookReview = await this.service.find(id, isOnlyPublished);
      return bookReview;
    }
    const bookReview = await this.axiosInstance.get<
      never,
      GetPublishedBookReviewResponse
    >(`${this.baseUrl}/${id}`, { params: { isOnlyPublished } });
    return bookReview;
  }

  getLatests(): ReturnType<BookReviewService['findTenLatest']> {
    if (this.service) {
      return this.service.findTenLatest();
    }
    return this.axiosInstance.get(`${this.baseUrl}/list/latest`);
  }

  getMostLikes(): ReturnType<BookReviewService['findTenMostLike']> {
    if (this.service) {
      return this.service.findTenMostLike();
    }
    return this.axiosInstance.get(`${this.baseUrl}/list/mostlike`);
  }

  getAllPublishedOfUser(
    userId: UserId,
  ): ReturnType<BookReviewService['findAllByUser']> {
    if (this.service) {
      return this.service.findAllByUser(userId);
    }
    return this.axiosInstance.get(`${this.baseUrl}/list/published`, {
      params: { userId },
    });
  }

  getAllDraftSavedOfUser(
    userId: UserId,
  ): ReturnType<BookReviewService['findAllDraftSavedByUser']> {
    if (this.service) {
      return this.service.findAllDraftSavedByUser(userId);
    }
    return this.axiosInstance.get(`${this.baseUrl}/list/draftsaved`, {
      params: { userId },
    });
  }

  getFollowings(
    userId: UserId,
  ): ReturnType<BookReviewService['findTenFollowing']> {
    if (this.service) {
      return this.service.findTenFollowing(userId);
    }
    return this.axiosInstance.get(`${this.baseUrl}/list/following`, {
      params: { userId },
    });
  }

  getFollowingPages({
    followerId,
    targetId,
  }: GetFollowingBookReviewPageRequest): ReturnType<
    BookReviewService['findFollowingPages']
  > {
    if (this.service) {
      return this.service.findFollowingPages({ followerId, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/list/following`, {
      params: { userId: followerId, cursor: `${targetId}` },
    });
  }

  getPagesByBookname({
    bookname,
    targetId,
  }: GetBookReviewPageByBookNameRequest): ReturnType<
    BookReviewService['findPagesByBookname']
  > {
    if (this.service) {
      return this.service.findPagesByBookname({ bookname, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/search/book`, {
      params: { query: bookname, cursor: `${targetId}` },
    });
  }

  getPagesByCategory({
    category,
    targetId,
  }: GetBookReviewPageByCategoryRequest): ReturnType<
    BookReviewService['findPagesByCategory']
  > {
    if (this.service) {
      return this.service.findPagesByCategory({ category, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/search/category`, {
      params: { query: category, cursor: `${targetId}` },
    });
  }

  getPagesByTag({
    tag,
    targetId,
  }: GetBookReviewPageByTagRequest): ReturnType<
    BookReviewService['findPagesByTag']
  > {
    if (this.service) {
      return this.service.findPagesByTag({ tag, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/search/tag`, {
      params: { query: tag, cursor: `${targetId}` },
    });
  }

  async getIds(): Promise<{ id: Id }[]> {
    if (this.service) {
      return this.service.findAllId();
    }
    return [];
  }
}

export default BookReviewRepository;
