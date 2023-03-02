import { BookReviewId } from '../bookReview/bookReviewEntity';
import { UserId } from '../user/user.entity';

interface LikeEntity {
  sejulbook_id: BookReviewId;
  liker_id: UserId;
}

export default LikeEntity;
