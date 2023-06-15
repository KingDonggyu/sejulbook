import {
  Authors,
  Bookname,
  CategoryId,
  Content,
  Id,
  OriginThumbnail,
  Publication,
  Publisher,
  Rating,
  Sejul,
  Thumbnail,
  UserId,
} from '.';

export interface CreateDraftSavedBookReviewRequestDTO {
  userId: UserId;
  bookname: Bookname;
  authors: Authors;
  publication: Publication;
  publisher: Publisher;
  rating: Rating;
  sejul: Sejul;
  content: Content;
  originThumbnail: OriginThumbnail;
  thumbnail?: Thumbnail;
  categoryId?: CategoryId;
}

export interface CreatePublishedBookReviewRequestDTO {
  id?: Id;
  bookname: Bookname;
  authors: Authors;
  publication: Publication;
  publisher: Publisher;
  thumbnail: Thumbnail;
  rating: Rating;
  sejul: Sejul;
  content: Content;
  userId: UserId;
  categoryId: CategoryId;
  originThumbnail: OriginThumbnail;
}
