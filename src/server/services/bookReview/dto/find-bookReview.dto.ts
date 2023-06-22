import {
  Authors,
  Bookname,
  Content,
  CreatedAt,
  Id,
  OriginThumbnail,
  Publisher,
  Rating,
  Sejul,
  Thumbnail,
  UserId,
  Writer,
} from '.';

export interface FindDraftSavedResponseDTO {
  id: Id;
  bookname: Bookname;
  createdAt: CreatedAt;
}

export interface FindResponseDTO {
  id: Id;
  bookname: Bookname;
  authors: Authors;
  publication: string;
  publisher: Publisher;
  thumbnail: Thumbnail;
  rating: Rating;
  sejul: Sejul;
  content: Content;
  originThumbnail: OriginThumbnail;
  createdAt: string;
  writer: Writer;
  category: string;
}

export interface FindLibraryResponseDTO {
  id: Id;
  bookname: Bookname;
  sejul: Sejul;
  thumbnail: Thumbnail;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}

export interface FindHomeResponseDTO {
  id: Id;
  bookname: Bookname;
  sejul: Sejul;
  thumbnail: Thumbnail;
  createdAt: string;
  userId: UserId;
  writer: Writer;
}
