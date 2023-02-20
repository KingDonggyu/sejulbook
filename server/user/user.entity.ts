type Gender = 0 | 1 | 2;

interface UserEntity {
  id: number;
  sub: string;
  email: string;
  nick: string;
  intoroduce: string;
  age: string | null;
  gender: Gender;
}

export default UserEntity;
