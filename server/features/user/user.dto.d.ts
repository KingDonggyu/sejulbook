export type UserId = number;
export type UserName = string;
type Gender = 0 | 1 | 2;

interface UserDTO {
  id: UserId;
  sub: string;
  email: string;
  name: UserName;
  introduce: string;
  age: string | null;
  gender: Gender;
}

export default UserDTO;
