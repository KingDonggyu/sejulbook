import FollowService, {
  FollowDefaultReqeustDTO,
  FindInfoRequestDTO,
} from '@/server/services/follow/follow.service';
import HttpClient from '../../lib/HttpClient';

class FollowRepository extends HttpClient {
  private service: FollowService | null;

  private baseUrl = '/follow';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new FollowService() : null;
  }

  async follow({ myUserId, targetUserId }: FollowDefaultReqeustDTO) {
    this.axiosInstance.post(
      `${this.baseUrl}/${myUserId}`,
      {},
      { params: { targetUserId } },
    );
  }

  async unfollow({ myUserId, targetUserId }: FollowDefaultReqeustDTO) {
    this.axiosInstance.delete(`${this.baseUrl}/${myUserId}`, {
      params: { targetUserId },
    });
  }

  get({
    myUserId,
    targetUserId,
  }: FindInfoRequestDTO): ReturnType<FollowService['findFollowInfo']> {
    if (this.service) {
      return this.service.findFollowInfo({ targetUserId, myUserId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/${myUserId}`, {
      params: { targetUserId },
    });
  }
}

export default FollowRepository;
