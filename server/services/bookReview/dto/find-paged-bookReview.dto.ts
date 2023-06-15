import { Id, Sejul, Thumbnail, UserId, Writer } from '.';

type Cursor = Id | null;

export interface FindPagedBookReviewByBooknameRequestDTO {
  bookname: string;
  targetId: Cursor;
}

export interface FindPagedBookReviewByCategoryRequestDTO {
  category: string;
  targetId: Cursor;
}

export interface FindPagedBookReviewByTagRequestDTO {
  tag: string;
  targetId: Cursor;
}

export interface FindPagedBookReviewByFollowingRequestDTO {
  followerId: number;
  targetId: Cursor;
}

export interface FindPagedBookReviewResponseDTO {
  id: Id;
  userId: UserId;
  sejul: Sejul;
  thumbnail: Thumbnail;
  writer: Writer;
}
