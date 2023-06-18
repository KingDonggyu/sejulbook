import { CategoryId, Content, Rating, Sejul, Thumbnail } from '.';

export interface UpdateDraftSavedBookReviewReqeustDTO {
  rating: Rating;
  sejul: Sejul;
  content: Content;
  thumbnail?: Thumbnail;
  categoryId?: CategoryId;
  tags: string[];
}

export interface UpdatePublishedBookReviewRequestDTO {
  rating: Rating;
  sejul: Sejul;
  content: Content;
  thumbnail: Thumbnail;
  categoryId: CategoryId;
  tags: string[];
}
