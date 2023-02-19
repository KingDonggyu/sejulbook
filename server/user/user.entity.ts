type Gender = 0 | 1 | 2;

interface UserEntity {
  id: number;
  sub: string;
  email: string;
  nick: string;
  intoroduce: string;
  gender: Gender;
  birth: Date;
  joindated: Date;
}

export default UserEntity;
