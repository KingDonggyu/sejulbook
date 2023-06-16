import { Id } from '.';

export interface FollowUsersReqeust {
  id: Id;
  targetId: number | null;
}
