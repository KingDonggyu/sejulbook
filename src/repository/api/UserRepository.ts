import UserService from '@/server/services/user.service';
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
    await this.axiosInstance.post(`${this.baseUrl}/signup`, user);
  }

  async update(user: UpdateUserRequest) {
    await this.axiosInstance.put(`${this.baseUrl}/${user.id}`, user);
  }

  async delete(userId: Id) {
    await this.axiosInstance.delete(`${this.baseUrl}/${userId}`);
  }

  get(userId: Id): ReturnType<UserService['findById']> {
    if (this.service) {
      return this.service.findById(userId);
    }
    return this.axiosInstance.get(`${this.baseUrl}/${userId}`);
  }

  search(query: string): ReturnType<UserService['findAllByNamePrefix']> {
    if (this.service) {
      return this.service.findAllByNamePrefix(query);
    }
    return this.axiosInstance.get(`${this.baseUrl}/search`, {
      params: { query },
    });
  }

  getIds(): ReturnType<UserService['findAllId']> | undefined {
    if (this.service) {
      return this.service.findAllId();
    }
    return undefined;
  }

  getPagedFollowers({
    id,
    targetId,
  }: GetUserPageRequest): ReturnType<UserService['findPagedFollowers']> {
    if (this.service) {
      return this.service.findPagedFollowers({ id, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/list/follower`, {
      params: {
        userId: id,
        cursor: targetId,
      },
    });
  }

  getPagedFollowings({
    id,
    targetId,
  }: GetUserPageRequest): ReturnType<UserService['findPagedFollowings']> {
    if (this.service) {
      return this.service.findPagedFollowings({ id, targetId });
    }
    return this.axiosInstance.get(`${this.baseUrl}/list/following`, {
      params: {
        userId: id,
        cursor: targetId,
      },
    });
  }
}

export default UserRepository;
