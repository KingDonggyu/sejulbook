type Gender = 0 | 1 | 2;

interface UserDTO {
  id: number;
  sub: string;
  email: string;
  name: string;
  intoroduce: string;
  gender: Gender;
  birth: Date;
  joindated: Date;
}

export default UserDTO;
