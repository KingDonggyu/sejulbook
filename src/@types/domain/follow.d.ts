declare module 'follow' {
  export type Id = number;
  export type UserId = number;

  /* Request */

  export interface FollowDefaultReqeust {
    myUserId: UserId;
    targetUserId: UserId;
  }

  export interface GetFollowInfoRequest {
    myUserId?: UserId;
    targetUserId: UserId;
  }

  interface GetPageRequest {
    targetId: Id | null;
  }

  export interface GetFollowerPageRequest extends GetPageRequest {
    followingId: UserId;
  }

  export interface GetFollowingPageRequest extends GetPageRequest {
    followerId: UserId;
  }

  /* Response */

  export interface GetFollowInfoResponse {
    isFollow: boolean;
    followerCount: number;
    followingCount: number;
  }

  interface GetPageResponse {
    id: Id;
  }

  export interface GetFollowerPageResponse extends GetPageResponse {
    followerId: UserId;
  }

  export interface GetFollowingPageResponse extends GetPageResponse {
    followingId: UserId;
  }
}
