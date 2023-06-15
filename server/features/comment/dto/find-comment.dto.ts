import { BookReviewId, CommenterId, Content, CreatedAt, Id } from '.';

interface FindCommentResponseDTO {
  id: Id;
  bookReviewId: BookReviewId;
  commenterId: CommenterId;
  content: Content;
  createdAt: CreatedAt;
}

export default FindCommentResponseDTO;
