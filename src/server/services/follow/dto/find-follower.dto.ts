import { UserId, Id } from '.';

export interface FindPagedFollowersRequestDTO {
  followingId: UserId;
  targetId: Id | null;
}

export interface FindPagedFollowerResponseDTO {
  id: Id;
  followerId: UserId;
}
