export type Id = number;
export type BookReviewId = number;
export type LikerId = number;

export interface LikeDefaultRequestDTO {
  bookReviewId: BookReviewId;
  likerId: LikerId;
}
