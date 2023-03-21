import { UserId } from '../user/user.entity';

export interface FollowEntity {
  id: number;
  follower_id: UserId;
  following_id: UserId;
}
