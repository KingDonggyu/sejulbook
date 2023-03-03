import { BookReviewId } from '../bookReview/bookReview.entity';
import { UserId } from '../user/user.entity';

interface LikeEntity {
  sejulbook_id: BookReviewId;
  liker_id: UserId;
}

export default LikeEntity;
