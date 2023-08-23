import { LikeService } from '@/server/services';
import HttpClient from '@/lib/HttpClient';
import type { LikeRequest, LikeStatusRequest, LikeStatusResponse } from 'like';

class LikeRepository extends HttpClient {
  private service: LikeService | null;

  private baseUrl = '/like';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new LikeService() : null;
  }

  async like({ bookReviewId, likerId }: LikeRequest) {
    await this.postRequset(
      `${this.baseUrl}/${bookReviewId}`,
      {},
      {
        params: { likerId },
      },
    );
  }

  async unlike({ bookReviewId, likerId }: LikeRequest) {
    await this.deleteRequest(`${this.baseUrl}/${bookReviewId}`, {
      params: { likerId },
    });
  }

  has({
    bookReviewId,
    likerId,
  }: LikeStatusRequest): Promise<LikeStatusResponse> {
    if (this.service) {
      return this.service.has({ bookReviewId, likerId });
    }
    return this.getRequest(`${this.baseUrl}/${bookReviewId}`, {
      params: { likerId },
    });
  }
}

export default LikeRepository;
