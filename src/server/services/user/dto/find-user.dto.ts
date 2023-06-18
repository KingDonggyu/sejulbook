import { Age, Email, Gender, Id, Introduce, Name, Sub } from '.';

export interface FindUserResponseDTO {
  id: Id;
  sub: Sub;
  name: Name;
  introduce: Introduce;
  email: Email;
  age: Age;
  gender: Gender;
}

export interface FindUserIdResponseDTO {
  id: Id;
}

export interface FindUserIdBySubResponseDTO {
  id: Id | null;
}

export interface FindUserNameResponseDTO {
  name: Name;
}

export interface FindSearchedUserResponseDTO {
  id: Id;
  name: Name;
  introduce: Introduce;
}
