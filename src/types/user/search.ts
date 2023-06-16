import { Id, Introduce, Name } from '.';

export type SearchUserResponse = {
  id: Id;
  name: Name;
  introduce: Introduce;
}[];
