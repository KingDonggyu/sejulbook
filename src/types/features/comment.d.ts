import { BookReviewId } from './bookReview';
import { UserId, UserName } from './user';

export type CommentContent = string;

interface Comment {
  writer: UserName;
  content: CommentContent;
  createdAt: string;
}

interface CommentResponse extends Pick<Comment, 'content' | 'createdAt'> {
  bookReviewId: BookReviewId;
  commenterId: UserId;
}
