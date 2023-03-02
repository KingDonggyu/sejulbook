import { BookReviewId } from '../bookReview/bookReviewEntity';

interface TagEntity {
  id: number;
  tag: string;
  sejulbook_id: BookReviewId;
}

export default TagEntity;
