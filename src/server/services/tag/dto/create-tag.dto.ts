import { BookReviewId, Tag } from '.';

export interface CreateTagReqeustDTO {
  bookReviewId: BookReviewId;
  tags: Tag[];
}
