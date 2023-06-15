import { BookReviewId, Id, Tag } from '.';

export interface FindTagResponseDTO {
  id: Id;
  tag: Tag;
  bookReviewId: BookReviewId;
}
