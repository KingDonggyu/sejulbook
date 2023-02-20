export type UserId = number;
export type UserName = string;
export type Sub = string;
export type Gender = 0 | 1 | 2;

export interface InitilaizedUser {
  id: UserId | null;
  sub: Sub;
  gender: Gender;
  email: string;
  age: string?;
}

export interface SignUpRequset extends InitilaizedUser {
  name: UserName;
  intoroduce: string;
  joindated: Date;
}
