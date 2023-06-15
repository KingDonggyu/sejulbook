import { Id, Introduce, Name } from '.';

export interface UpdateUserRequestDTO {
  id: Id;
  name: Name;
  introduce: Introduce;
}
