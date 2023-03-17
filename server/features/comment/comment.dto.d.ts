import { BookReviewId } from '../bookReview/bookReview.dto';
import { UserId } from '../user/user.dto';

interface CommentDTO {
  id: number;
  bookReviewId: BookReviewId;
  commenterId: UserId;
  content: string;
  createdAt: string;
}

export default CommentDTO;
