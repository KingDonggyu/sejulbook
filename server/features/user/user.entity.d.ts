export type UserId = number;
export type UserName = string;
type Gender = 0 | 1 | 2;

interface UserEntity {
  id: UserId;
  sub: string;
  email: string;
  nick: UserName;
  introduce: string;
  age: string | null;
  gender: Gender;
}

export default UserEntity;
