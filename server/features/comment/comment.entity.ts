import { BookReviewId } from '../bookReview/bookReviewEntity';
import { UserId } from '../user/user.entity';

interface CommentEntity {
  sejulbook_id: BookReviewId;
  replyer_id: UserId;
  reply: string;
  replydate: string;
}

export default CommentEntity;
