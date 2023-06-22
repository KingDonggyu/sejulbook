import BookReviewService, {
  Id,
  UserId,
  CreatePublishRequestDTO,
  CreateDraftSaveRequestDTO,
  UpdatePublishedRequestDTO,
  UpdateDraftSavedReqeustDTO,
  FindPagesByBooknameRequestDTO,
  FindPagesByCategoryRequestDTO,
  FindPagesByTagRequestDTO,
  FindPagesByFollowingRequestDTO,
} from '@/server/services/bookReview/bookReview.service';
import HttpClient from '../../lib/HttpClient';

class BookReviewRepository extends HttpClient {
  private service: BookReviewService | null;

  private baseUrl = '/bookreview';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new BookReviewService() : null;
  }

  async publish(bookReview: CreatePublishRequestDTO) {
    const { data } = await this.axiosInstance.post<{ bookReviewId: Id }>(
      `${this.baseUrl}/publish`,
      bookReview,
    );
    return data;
  }

  async draftSave(bookReview: CreateDraftSaveRequestDTO) {
    const { data } = await this.axiosInstance.post<{ bookReviewId: Id }>(
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
    bookReview: UpdatePublishedRequestDTO;
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
    bookReview: UpdateDraftSavedReqeustDTO;
  }) {
    await this.axiosInstance.put(`${this.baseUrl}/${id}`, bookReview, {
      params: { userId, isPublished: false },
    });
  }

  get(id: Id): ReturnType<BookReviewService['find']> {
    if (this.service) {
      return this.service.find(id);
    }
    return this.axiosInstance.get(`${this.baseUrl}/${id}`);
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
  }: FindPagesByFollowingRequestDTO): ReturnType<
    BookReviewService['findFollowingPages']
  > {
    if (this.service) {
      return this.service.findFollowingPages({ followerId, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/list/following`, {
      params: { userId: followerId, cursor: targetId },
    });
  }

  getPagesByBookname({
    bookname,
    targetId,
  }: FindPagesByBooknameRequestDTO): ReturnType<
    BookReviewService['findPagesByBookname']
  > {
    if (this.service) {
      return this.service.findPagesByBookname({ bookname, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/search/book`, {
      params: { query: bookname, cursor: targetId },
    });
  }

  getPagesByCategory({
    category,
    targetId,
  }: FindPagesByCategoryRequestDTO): ReturnType<
    BookReviewService['findPagesByCategory']
  > {
    if (this.service) {
      return this.service.findPagesByCategory({ category, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/search/category`, {
      params: { query: category, cursor: targetId },
    });
  }

  getPagesByTag({
    tag,
    targetId,
  }: FindPagesByTagRequestDTO): ReturnType<
    BookReviewService['findPagesByTag']
  > {
    if (this.service) {
      return this.service.findPagesByTag({ tag, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/search/tag`, {
      params: { query: tag, cursor: targetId },
    });
  }

  getIds(): ReturnType<BookReviewService['findAllId']> | undefined {
    if (this.service) {
      return this.service.findAllId();
    }
    return undefined;
  }
}

export default BookReviewRepository;
