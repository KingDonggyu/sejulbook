import { BookReviewId, CommenterId, Content } from '.';

export interface CreateCommentRequestDTO {
  bookReviewId: BookReviewId;
  commenterId: CommenterId;
  content: Content;
}
