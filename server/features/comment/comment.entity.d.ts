import { BookReviewId } from '../bookReview/bookReview.entity';
import { UserId } from '../user/user.entity';

interface CommentEntity {
  id: number;
  sejulbook_id: BookReviewId;
  replyer_id: UserId;
  reply: string;
  replydate: string;
}

export default CommentEntity;
