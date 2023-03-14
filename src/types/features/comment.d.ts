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

type CommentResponse = {
  id: CommentId;
} & CommentRequest &
  Pick<Comment, 'createdAt'>;
