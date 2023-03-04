import { BookReviewId } from '../bookReview/bookReview.entity';

interface TagEntity {
  id: number;
  tag: string;
  sejulbook_id: BookReviewId;
}

export default TagEntity;
