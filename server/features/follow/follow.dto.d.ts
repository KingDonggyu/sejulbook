import { UserId } from '../user/user.dto';

export interface FollowDTO {
  id: number;
  followerId: UserId;
  followingId: UserId;
}
