import { Id, Introduce, Name } from '.';

export interface FindPagedUserResponseDTO {
  id: Id;
  name: Name;
  introduce: Introduce;
  nextTargetId: number;
}

export interface FindPagedUserRequestDTO {
  id: Id;
  targetId: number | null;
}
