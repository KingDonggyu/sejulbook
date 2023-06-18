import { UserId, Id } from '.';

export interface FindPagedFollowingsRequestDTO {
  followerId: UserId;
  targetId: Id | null;
}

export interface FindPagedFollowingResponseDTO {
  id: Id;
  followingId: UserId;
}
