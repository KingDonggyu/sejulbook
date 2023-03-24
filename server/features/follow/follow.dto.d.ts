import { UserId } from '../user/user.dto';

export type FollowId = number;

export interface FollowDTO {
  id: FollowId;
  followerId: UserId;
  followingId: UserId;
}
