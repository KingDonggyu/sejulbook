type Gender = 0 | 1 | 2;

interface UserDTO {
  id: number;
  sub: string;
  email: string;
  name: string;
  intoroduce: string;
  age: string | null;
  gender: Gender;
}

export default UserDTO;
