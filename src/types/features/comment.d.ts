import { BookReviewId } from './bookReview';
import { UserId, UserName } from './user';

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

type CommentResponse = CommentRequest & Pick<Comment, 'createdAt'>;
