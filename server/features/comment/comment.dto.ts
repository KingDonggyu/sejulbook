import { BookReviewId } from '../bookReview/bookReview.dto';
import { UserId } from '../user/user.dto';

interface CommentDTO {
  bookReviewId: BookReviewId;
  commenterId: UserId;
  content: string;
  createAt: string;
}

export default CommentDTO;
