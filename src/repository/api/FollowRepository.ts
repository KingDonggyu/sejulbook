import { FollowService } from '@/server/services';
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
    await this.postRequset(
      `${this.baseUrl}/${myUserId}`,
      {},
      { params: { targetUserId } },
    );
  }

  async unfollow({ myUserId, targetUserId }: FollowDefaultReqeust) {
    await this.deleteRequest(`${this.baseUrl}/${myUserId}`, {
      params: { targetUserId },
    });
  }

  httpGet({
    myUserId,
    targetUserId,
  }: GetFollowInfoRequest): ReturnType<FollowService['findFollowInfo']> {
    if (this.service) {
      return this.service.findFollowInfo({ targetUserId, myUserId });
    }
    return this.getRequest(`${this.baseUrl}/${myUserId}`, {
      params: { targetUserId },
    });
  }
}

export default FollowRepository;
