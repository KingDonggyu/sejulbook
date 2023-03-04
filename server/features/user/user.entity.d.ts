export type UserId = number;
type Gender = 0 | 1 | 2;

interface UserEntity {
  id: UserId;
  sub: string;
  email: string;
  nick: string;
  introduce: string;
  age: string | null;
  gender: Gender;
}

export default UserEntity;
