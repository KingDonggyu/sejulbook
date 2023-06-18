import FollowService, {
  FollowDefaultReqeustDTO,
  FindInfoRequestDTO,
} from 'server/services/follow/follow.service';
import HttpClient from './HttpClient';

class FollowRepository extends HttpClient {
  private service = new FollowService();

  private baseUrl = '/follow';

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

  get({ myUserId, targetUserId }: FindInfoRequestDTO) {
    return this.service.findFollowInfo({ targetUserId, myUserId });
  }
}

export default FollowRepository;
