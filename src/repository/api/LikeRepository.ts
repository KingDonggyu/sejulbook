import LikeService, {
  LikeDefaultRequestDTO,
} from '@/server/services/like/like.service';
import HttpClient from '../../lib/HttpClient';

class LikeRepository extends HttpClient {
  private service: LikeService | null;

  private baseUrl = '/like';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new LikeService() : null;
  }

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
    if (this.service) {
      return this.service.has({ bookReviewId, likerId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/${bookReviewId}`, {
      params: { likerId },
    });
  }
}

export default LikeRepository;
