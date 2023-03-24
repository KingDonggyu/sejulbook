import { UserId } from './user';

export interface FollowInfoRequest {
  targetUserId: UserId;
  myUserId?: UserId;
}

export interface FollowInfoResponse {
  followerCount: number;
  followingCount: number;
  isFollow: boolean;
}

export interface SubscribeRequest {
  targetUserId: UserId;
  myUserId: UserId;
}
