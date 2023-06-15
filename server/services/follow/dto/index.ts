export type Id = number;
export type UserId = number;

export interface FollowDefaultReqeustDto {
  followerId: UserId;
  followingId: UserId;
}
