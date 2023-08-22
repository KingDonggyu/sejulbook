import { UserService } from '@/server/services';
import HttpClient from '@/lib/HttpClient';

import type {
  Id,
  CreateUserRequest,
  GetUserPageRequest,
  UpdateUserRequest,
} from 'user';

class UserRepository extends HttpClient {
  private service: UserService | null;

  private baseUrl = '/user';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new UserService() : null;
  }

  async signUp(user: CreateUserRequest) {
    await this.postRequset(`${this.baseUrl}/signup`, user);
  }

  async update(user: UpdateUserRequest) {
    await this.putRequest(`${this.baseUrl}/${user.id}`, user);
  }

  async delete(userId: Id) {
    await this.deleteRequest(`${this.baseUrl}/${userId}`);
  }

  httpGet(userId: Id): ReturnType<UserService['findById']> {
    if (this.service) {
      return this.service.findById(userId);
    }
    return this.getRequest(`${this.baseUrl}/${userId}`);
  }

  search(query: string): ReturnType<UserService['findAllByNamePrefix']> {
    if (this.service) {
      return this.service.findAllByNamePrefix(query);
    }
    return this.getRequest(`${this.baseUrl}/search`, {
      params: { query },
    });
  }

  async getIds(): Promise<{ id: Id }[]> {
    if (this.service) {
      return this.service.findAllId();
    }
    return [];
  }

  getPagedFollowers({
    id,
    myUserId,
    targetId,
  }: GetUserPageRequest): ReturnType<UserService['findPagedFollowers']> {
    if (this.service) {
      return this.service.findPagedFollowers({ id, targetId, myUserId });
    }
    return this.getRequest(`${this.baseUrl}/list/follower`, {
      params: {
        myUserId,
        targetUserId: id,
        cursor: `${targetId}`,
      },
    });
  }

  getPagedFollowings({
    id,
    myUserId,
    targetId,
  }: GetUserPageRequest): ReturnType<UserService['findPagedFollowings']> {
    if (this.service) {
      return this.service.findPagedFollowings({ id, targetId, myUserId });
    }
    return this.getRequest(`${this.baseUrl}/list/following`, {
      params: {
        myUserId,
        targetUserId: id,
        cursor: `${targetId}`,
      },
    });
  }
}

export default UserRepository;
