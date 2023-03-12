import { BookReviewId } from './bookReview';
import { UserId } from './user';

export interface LikeRequest {
  userId: UserId;
  bookReviewId: BookReviewId;
}

export interface LikeResponse {
  isLike: boolean;
}
