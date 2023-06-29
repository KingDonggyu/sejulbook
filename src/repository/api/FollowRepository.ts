import FollowService from '@/server/services/follow.service';
import HttpClient from '@/lib/HttpClient';
import type { FollowDefaultReqeust, GetFollowInfoRequest } from 'follow';

class FollowRepository extends HttpClient {
  private service: FollowService | null;

  private baseUrl = '/follow';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new FollowService() : null;
  }

  async follow({ myUserId, targetUserId }: FollowDefaultReqeust) {
    await this.axiosInstance.post(
      `${this.baseUrl}/${myUserId}`,
      {},
      { params: { targetUserId } },
    );
  }

  async unfollow({ myUserId, targetUserId }: FollowDefaultReqeust) {
    await this.axiosInstance.delete(`${this.baseUrl}/${myUserId}`, {
      params: { targetUserId },
    });
  }

  get({
    myUserId,
    targetUserId,
  }: GetFollowInfoRequest): ReturnType<FollowService['findFollowInfo']> {
    if (this.service) {
      return this.service.findFollowInfo({ targetUserId, myUserId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/${myUserId}`, {
      params: { targetUserId },
    });
  }
}

export default FollowRepository;
