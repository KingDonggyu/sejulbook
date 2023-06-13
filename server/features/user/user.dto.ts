export type Id = number;
export type Name = string;
export type Introduce = string;
export type Sub = string;

interface UserDto {
  id: Id;
  sub: Sub;
  name: Name;
  introduce: Introduce;
  email: string;
  age: string | null;
  gender: number;
}

export type CreateUserDto = Omit<UserDto, 'id'>;
export type UpdateUserDto = Pick<UserDto, 'id' | 'name' | 'introduce'>;

export interface RequestPagedUserDto {
  id: Id;
  targetId: Id | null;
}

export type ResponsePagedUserDto = {
  id: Id;
  name: Name;
  introduce: Introduce;
  targetId: Id;
}[];

export type ResponseSerchedUserDto = Pick<
  UserDto,
  'id' | 'name' | 'introduce'
>[];

export default UserDto;
