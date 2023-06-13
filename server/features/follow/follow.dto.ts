export type UserId = number;

export default interface FollowDto {
  followerId: UserId;
  followingId: UserId;
}
