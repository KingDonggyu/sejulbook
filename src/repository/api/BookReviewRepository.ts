import BookReviewService, {
  Id,
  UserId,
  CreatePublishRequestDTO,
  CreateDraftSaveRequestDTO,
  UpdatePublishedBookReviewRequestDTO,
  UpdateDraftSavedBookReviewReqeustDTO,
  FindPagedBookReviewByBooknameRequestDTO,
  FindPagedBookReviewByCategoryRequestDTO,
  FindPagedBookReviewByTagRequestDTO,
  FindPagedBookReviewByFollowingRequestDTO,
} from 'server/services/bookReview/bookReview.service';
import HttpClient from '../../lib/HttpClient';

class BookReviewRepository extends HttpClient {
  private service = new BookReviewService();

  private baseUrl = '/bookreview';

  async publish(bookReview: CreatePublishRequestDTO) {
    this.axiosInstance.post(`${this.baseUrl}/publish`, bookReview);
  }

  async draftSave(bookReview: CreateDraftSaveRequestDTO) {
    this.axiosInstance.post(`${this.baseUrl}/draftsave`, bookReview);
  }

  async delete(id: Id, userId: UserId) {
    this.axiosInstance.delete(`${this.baseUrl}/${id}`, { params: { userId } });
  }

  async updatePublished(
    id: Id,
    userId: UserId,
    bookReview: UpdatePublishedBookReviewRequestDTO,
  ) {
    this.axiosInstance.put(`${this.baseUrl}/${id}`, bookReview, {
      params: { userId, isPublished: true },
    });
  }

  async updateDraftSaved(
    id: Id,
    userId: UserId,
    bookReview: UpdateDraftSavedBookReviewReqeustDTO,
  ) {
    this.axiosInstance.put(`${this.baseUrl}/${id}`, bookReview, {
      params: { userId, isPublished: false },
    });
  }

  getPublished(id: Id) {
    return this.service.findPublished(id);
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

  getPagesByBookname({
    bookname,
    targetId,
  }: FindPagedBookReviewByBooknameRequestDTO) {
    return this.service.findPagesByBookname({ bookname, targetId });
  }

  getPagesByCategory({
    category,
    targetId,
  }: FindPagedBookReviewByCategoryRequestDTO) {
    return this.service.findPagesByCategory({ category, targetId });
  }

  getPagesByTag({ tag, targetId }: FindPagedBookReviewByTagRequestDTO) {
    return this.service.findPagesByTag({ tag, targetId });
  }

  getFollowingPages({
    followerId,
    targetId,
  }: FindPagedBookReviewByFollowingRequestDTO) {
    return this.service.findFollowingPages({ followerId, targetId });
  }

  getIds() {
    return this.service.findAllId();
  }
}

export default BookReviewRepository;
