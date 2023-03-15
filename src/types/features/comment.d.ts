import { BookReviewId } from './bookReview';
import { UserId, UserName } from './user';

export type CommentId = number;
export type CommentContent = string;

interface Comment {
  writer: UserName;
  content: CommentContent;
  createdAt: string;
}

interface CommentRequest extends Pick<Comment, 'content'> {
  bookReviewId: BookReviewId;
  commenterId: UserId;
}

interface CommentDeleteRequest {
  id: CommentId;
  userId: UserId;
  bookReviewId: BookReviewId;
}

interface CommentUpdateRequest extends Pick<Comment, 'content'> {
  id: CommentId;
  userId: UserId;
  bookReviewId: BookReviewId;
}

interface CommentResponse {
  id: CommentId;
  bookReviewId: BookReviewId;
  commenterId: UserId;
  content: CommentContent;
  createdAt: string;
}
