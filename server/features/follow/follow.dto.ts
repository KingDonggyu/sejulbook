export type Id = number;
export type UserId = number;

export default interface FollowDto {
  followerId: UserId;
  followingId: UserId;
}

export interface RequestFindPagedFollowingDto {
  followerId: UserId;
  targetId: UserId | null;
}

export interface RequestFindPagedFollowerDto {
  followingId: UserId;
  targetId: UserId | null;
}

export type ResponseFindPagedFollowingDto = {
  id: Id;
  followingId: UserId;
}[];

export type ResponseFindPagedFollowerDto = {
  id: Id;
  followerId: UserId;
}[];
