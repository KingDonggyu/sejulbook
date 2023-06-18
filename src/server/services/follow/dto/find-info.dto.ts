import { UserId } from '.';

export interface FindInfoRequestDTO {
  myUserId?: UserId;
  targetUserId: UserId;
}

export interface FindInfoResponseDTO {
  isFollow: boolean;
  followerCount: number;
  followingCount: number;
}
