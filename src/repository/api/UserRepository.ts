import UserService, {
  Id,
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  FindPagedUserRequestDTO,
} from 'server/services/user/user.service';
import HttpClient from '../../lib/HttpClient';

class UserRepository extends HttpClient {
  private service = new UserService();

  private baseUrl = '/user';

  async signUp(user: CreateUserRequestDTO) {
    this.service.create(user);
  }

  async update(user: UpdateUserRequestDTO) {
    this.axiosInstance.put(`${this.baseUrl}/${user.id}`, user);
  }

  async delete(userId: Id) {
    this.axiosInstance.delete(`${this.baseUrl}/${userId}`);
  }

  get(userId: Id) {
    return this.service.findById(userId);
  }

  search(query: string) {
    return this.service.findAllByNamePrefix(query);
  }

  getIds() {
    return this.service.findAllId();
  }

  getPagedFollowers(request: FindPagedUserRequestDTO) {
    return this.service.findPagedFollowers(request);
  }

  getPagedFollowings(request: FindPagedUserRequestDTO) {
    return this.service.findPagedFollowings(request);
  }
}

export default UserRepository;
