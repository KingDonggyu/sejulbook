import { Id, Sejul, Thumbnail, UserId, Writer } from '.';

type Cursor = Id | null;

export interface FindPagesByBooknameRequestDTO {
  bookname: string;
  targetId: Cursor;
}

export interface FindPagesByCategoryRequestDTO {
  category: string;
  targetId: Cursor;
}

export interface FindPagesByTagRequestDTO {
  tag: string;
  targetId: Cursor;
}

export interface FindPagesByFollowingRequestDTO {
  followerId: number;
  targetId: Cursor;
}

export interface FindPagesResponseDTO {
  id: Id;
  userId: UserId;
  sejul: Sejul;
  thumbnail: Thumbnail;
  writer: Writer;
}
