import { BookReviewId } from './bookReview';
import { UserId } from './user';

export interface LikeRequest {
  userId?: UserId;
  bookReviewId: BookReviewId;
}

export type LikeResponse = {
  isLike: boolean;
  likeCount: number;
};
