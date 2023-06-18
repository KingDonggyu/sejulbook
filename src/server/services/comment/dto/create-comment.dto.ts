import { BookReviewId, CommenterId, Content } from '.';

export interface CreateRequestDTO {
  bookReviewId: BookReviewId;
  commenterId: CommenterId;
  content: Content;
}
