export type Id = number;
export type BookReviewId = number;
export type LikerId = number;

interface LikeDto {
  bookReviewId: BookReviewId;
  likerId: LikerId;
}

export default LikeDto;
