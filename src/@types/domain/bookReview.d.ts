declare module 'bookReview' {
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

  interface CreateRequest {
    userId: UserId;
    bookname: Bookname;
    authors: Authors;
    publication: Publication;
    publisher: Publisher;
    rating: Rating;
    sejul: Sejul;
    content: Content;
    originThumbnail: OriginThumbnail;
    tags: string[];
  }

  interface UpdateRequest {
    rating: Rating;
    sejul: Sejul;
    content: Content;
    tags: string[];
  }

  export interface CreateDrafvSavedBookReviewReqeust extends CreateRequest {
    thumbnail?: Thumbnail;
    categoryId?: CategoryId;
  }

  export interface CreatePublishedBookReviewRequest extends CreateRequest {
    id?: Id;
    thumbnail: Thumbnail;
    categoryId: CategoryId;
  }

  export interface UpdateDraftSavedBookReviewReqeust extends UpdateRequest {
    thumbnail?: Thumbnail;
    categoryId?: CategoryId;
  }

  export interface UpdatePublishedBookReviewRequest extends UpdateRequest {
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
    category: string;
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
}
