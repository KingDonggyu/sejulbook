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
  private service = new BookReviewService();

  private baseUrl = '/bookreview';

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
    this.axiosInstance.delete(`${this.baseUrl}/${id}`, { params: { userId } });
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
    this.axiosInstance.put(`${this.baseUrl}/${id}`, bookReview, {
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
    this.axiosInstance.put(`${this.baseUrl}/${id}`, bookReview, {
      params: { userId, isPublished: false },
    });
  }

  get(id: Id) {
    return this.service.find(id);
  }

  getLatests() {
    return this.service.findTenLatest();
  }

  getMostLikes() {
    return this.service.findTenMostLike();
  }

  getFollowings(userId: UserId) {
    return this.service.findTenFollowing(userId);
  }

  getAllPublishedOfUser(userId: UserId) {
    return this.service.findAllByUser(userId);
  }

  getAllDraftSavedOfUser(userId: UserId) {
    return this.service.findAllDraftSavedByUser(userId);
  }

  getPagesByBookname({ bookname, targetId }: FindPagesByBooknameRequestDTO) {
    return this.service.findPagesByBookname({ bookname, targetId });
  }

  getPagesByCategory({ category, targetId }: FindPagesByCategoryRequestDTO) {
    return this.service.findPagesByCategory({ category, targetId });
  }

  getPagesByTag({ tag, targetId }: FindPagesByTagRequestDTO) {
    return this.service.findPagesByTag({ tag, targetId });
  }

  getFollowingPages({ followerId, targetId }: FindPagesByFollowingRequestDTO) {
    return this.service.findFollowingPages({ followerId, targetId });
  }

  getIds() {
    return this.service.findAllId();
  }
}

export default BookReviewRepository;
