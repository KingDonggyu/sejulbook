import { BookReviewId } from '../bookReview/bookReview.dto';

export type Tag = string;

interface TagDTO {
  id: number;
  tag: Tag;
  bookReviewId: BookReviewId;
}

export default TagDTO;
