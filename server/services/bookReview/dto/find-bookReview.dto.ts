import {
  Authors,
  Bookname,
  Content,
  CreatedAt,
  Id,
  OriginThumbnail,
  Publication,
  Publisher,
  Rating,
  Sejul,
  Thumbnail,
  UserId,
  Writer,
} from '.';

export interface FindDraftSavedBookReviewResponseDTO {
  id: Id;
  bookname: Bookname;
  createdAt: CreatedAt;
}

export interface FindPublishedBookReviewResponseDTO {
  id: Id;
  bookname: Bookname;
  authors: Authors;
  publication: Publication;
  publisher: Publisher;
  thumbnail: Thumbnail;
  rating: Rating;
  sejul: Sejul;
  content: Content;
  originThumbnail: OriginThumbnail;
  createdAt: CreatedAt;
  writer: Writer;
  category: string;
}

export interface FindLibraryBookReviewResponseDTO {
  id: Id;
  bookname: Bookname;
  sejul: Sejul;
  thumbnail: Thumbnail;
  createdAt: CreatedAt;
  likeCount: number;
  commentCount: number;
}

export interface FindHomeBookReviewResponseDTO {
  id: Id;
  bookname: Bookname;
  sejul: Sejul;
  thumbnail: Thumbnail;
  createdAt: CreatedAt;
  userId: UserId;
  writer: Writer;
}
