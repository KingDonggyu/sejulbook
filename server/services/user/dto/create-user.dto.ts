import { Age, Email, Gender, Introduce, Name, Sub } from '.';

export interface CreateUserRequestDTO {
  sub: Sub;
  name: Name;
  introduce: Introduce;
  email: Email;
  age: Age;
  gender: Gender;
}
