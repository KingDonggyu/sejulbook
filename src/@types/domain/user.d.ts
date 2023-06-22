declare module 'user' {
  export type Id = number;
  export type Name = string;
  export type Introduce = string;
  export type Sub = string;
  export type Email = string;
  export type Age = string | null;
  export type Gender = number;

  /* View */

  export interface Profile {
    name: Name;
    introduce: Introduce;
  }

  /* Request */

  export interface CreateUserRequest {
    sub: Sub;
    name: Name;
    introduce: Introduce;
    email: Email;
    age: Age;
    gender: Gender;
  }

  export interface UpdateUserRequest {
    id: Id;
    name: Name;
    introduce: Introduce;
  }

  export interface GetUserPageRequest {
    id: Id;
    targetId: number | null;
  }

  /* Response */

  export interface GetUserResponse extends CreateUserRequest {
    id: Id;
    joindated: string;
  }

  export interface GetSearchedUserResponse {
    id: Id;
    name: Name;
    introduce: Introduce;
  }

  export interface GetUserPageResponse extends GetSearchedUserResponse {
    nextTargetId: number;
  }
}
