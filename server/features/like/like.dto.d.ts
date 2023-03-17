import { BookReviewId } from '../bookReview/bookReview.dto';
import { UserId } from '../user/user.dto';

interface LikeDTO {
  bookReviewId: BookReviewId;
  likerId?: UserId;
}

export default LikeDTO;
