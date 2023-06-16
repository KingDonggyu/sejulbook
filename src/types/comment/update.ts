import { BookReviewId, CommenterId, Content, Id } from '.';

export interface UpdateCommentRequest {
  id: Id;
  commenterId: CommenterId;
  bookReviewId: BookReviewId;
  content: Content;
}
