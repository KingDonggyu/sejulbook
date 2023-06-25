declare module 'bookReview' {
  import type { Book } from 'book';
  import type { Tag } from 'tag';
  import type { Category, GetCategoryResponse } from 'category';

  export type Id = number;
  export type UserId = number;
  export type CategoryId = number;
  export type Bookname = string;
  export type Authors = string;
  export type Publication = string;
  export type Publisher = string;
  export type Thumbnail = string;
  export type Rating = number;
  export type Sejul = string;
  export type Content = string;
  export type OriginThumbnail = string | undefined;
  export type CreatedAt = string;
  export type Writer = string;

  /* Request */

  interface CreateBookReviewReqeust {
    id?: Id;
    userId: UserId;
    bookname: Bookname;
    authors: Authors;
    publication: Publication;
    publisher: Publisher;
    rating: Rating;
    sejul: Sejul;
    content: Content;
    thumbnail: Thumbnail;
    categoryId: CategoryId;
    originThumbnail: OriginThumbnail;
    tags: Tag[];
  }

  interface UpdateBookReviewRequest {
    id: Id;
    rating: Rating;
    sejul: Sejul;
    content: Content;
    tags: Tag[];
    thumbnail: Thumbnail;
    categoryId: CategoryId;
  }

  interface GetBookReviewPageRequest {
    targetId: Id | null;
  }

  export interface GetBookReviewPageByBookNameRequest
    extends GetBookReviewPageRequest {
    bookname: string;
  }

  export interface GetBookReviewPageByCategoryRequest
    extends GetBookReviewPageRequest {
    category: string;
  }

  export interface GetBookReviewPageByTagRequest
    extends GetBookReviewPageRequest {
    tag: string;
  }

  export interface GetFollowingBookReviewPageRequest
    extends GetBookReviewPageRequest {
    followerId: number;
  }

  /* Response */

  export interface GetDraftSavedBookReviewResponse {
    id: Id;
    bookname: Bookname;
    createdAt: CreatedAt;
  }

  export interface GetPublishedBookReviewResponse
    extends GetDraftSavedBookReviewResponse {
    userId: UserId;
    authors: Authors;
    publication: Publication;
    publisher: Publisher;
    thumbnail: Thumbnail;
    rating: Rating;
    sejul: Sejul;
    content: Content;
    originThumbnail: OriginThumbnail;
    writer: Writer;
    categorId: CategoryId;
    category: Category;
  }

  export interface GetLibraryBookReviewResponse
    extends GetDraftSavedBookReviewResponse {
    sejul: Sejul;
    thumbnail: Thumbnail;
    likeCount: number;
    commentCount: number;
  }

  export interface GetHomeBookReviewResponse
    extends GetDraftSavedBookReviewResponse {
    sejul: Sejul;
    thumbnail: Thumbnail;
    userId: UserId;
    writer: Writer;
  }

  export interface GetBookReviewPageResponse {
    id: Id;
    userId: UserId;
    sejul: Sejul;
    thumbnail: Thumbnail;
    writer: Writer;
  }

  /* View */

  export interface PublishOption {
    thumbnail: Thumbnail;
    category: GetCategoryResponse;
    rating: Rating;
    tags: Tag[];
    sejul: Sejul;
    content: Content;
  }

  export interface NewBookReview extends PublishOption {
    id?: Id;
    book: Book;
  }

  export type BookReviewToPublish = Omit<CreateBookReviewReqeust, 'userId'>;
}
