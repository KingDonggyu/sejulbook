import LikeService from '@/server/services/like.service';
import HttpClient from '@/lib/HttpClient';
import type { LikeRequest } from 'like';

class LikeRepository extends HttpClient {
  private service: LikeService | null;

  private baseUrl = '/like';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new LikeService() : null;
  }

  async like({ bookReviewId, likerId }: LikeRequest) {
    await this.axiosInstance.post(
      `${this.baseUrl}/${bookReviewId}`,
      {},
      {
        params: { likerId },
      },
    );
  }

  async unlike({ bookReviewId, likerId }: LikeRequest) {
    await this.axiosInstance.delete(`${this.baseUrl}/${bookReviewId}`, {
      params: { likerId },
    });
  }

  has({ bookReviewId, likerId }: LikeRequest) {
    if (this.service) {
      return this.service.has({ bookReviewId, likerId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/${bookReviewId}`, {
      params: { likerId },
    });
  }
}

export default LikeRepository;
