import { UserId } from '../user/user.entity';

export type FollowId = number;

export interface FollowEntity {
  id: FollowId;
  follower_id: UserId;
  following_id: UserId;
}
