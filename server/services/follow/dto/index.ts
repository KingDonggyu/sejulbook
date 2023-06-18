export type Id = number;
export type UserId = number;

export interface FollowDefaultReqeustDTO {
  myUserId: UserId;
  targetUserId: UserId;
}
