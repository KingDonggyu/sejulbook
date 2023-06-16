import { OAuthName } from '@/constants';

export type UserId = number;
export type UserName = string;
export type Sub = string;
export type Introduce = string;
export type Gender = 0 | 1 | 2;

export interface Session {
  id: number | null;
  sub?: Sub;
  gender?: Gender;
  email?: string;
  age?: string | null;
  oAuth?: OAuthName;
}

export interface InitilaizedUser {
  id: null;
  sub: Sub;
  gender: Gender;
  email: string;
  age: string?;
  oAuth: OAuthName;
}

export interface SignUpRequset extends Omit<InitilaizedUser, 'oAuth'> {
  name: UserName;
  introduce: Introduce;
}

export interface User {
  id: UserId;
  name: UserName;
  introduce: Introduce;
}

export interface FollowUser extends User {
  followId: number;
  isFollow: boolean;
}

export interface FollowUserListRequst {
  myUserId?: UserId;
  targetUserId: UserId;
  pageParam?: number | null;
}
