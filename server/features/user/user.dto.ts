type Gender = 0 | 1 | 2;

interface UserDTO {
  id: number | null;
  sub: string;
  email: string;
  name: string;
  introduce: string;
  age: string | null;
  gender: Gender;
}

export default UserDTO;
