declare module 'like' {
  export type Id = number;
  export type BookReviewId = number;
  export type LikerId = number;

  export interface LikeRequest {
    bookReviewId: BookReviewId;
    likerId: LikerId;
  }
}
