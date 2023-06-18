import LikeService, {
  LikeDefaultRequestDTO,
} from '@/server/services/like/like.service';
import HttpClient from '../../lib/HttpClient';

class LikeRepository extends HttpClient {
  private service = new LikeService();

  private baseUrl = '/like';

  async like({ bookReviewId, likerId }: LikeDefaultRequestDTO) {
    this.axiosInstance.post(
      `${this.baseUrl}/${bookReviewId}`,
      {},
      {
        params: { likerId },
      },
    );
  }

  async unlike({ bookReviewId, likerId }: LikeDefaultRequestDTO) {
    this.axiosInstance.delete(`${this.baseUrl}/${bookReviewId}`, {
      params: { likerId },
    });
  }

  has({ bookReviewId, likerId }: LikeDefaultRequestDTO) {
    return this.service.has({ bookReviewId, likerId });
  }
}

export default LikeRepository;
