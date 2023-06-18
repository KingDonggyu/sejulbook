import { BookReviewId, CommenterId, Content, CreatedAt, Id } from '.';

export interface FindCommentResponseDTO {
  id: Id;
  bookReviewId: BookReviewId;
  commenterId: CommenterId;
  content: Content;
  createdAt: CreatedAt;
}
