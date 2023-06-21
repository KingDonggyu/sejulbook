import { CategoryId, Content, Rating, Sejul, Thumbnail } from '.';

export interface UpdateDraftSavedReqeustDTO {
  rating: Rating;
  sejul: Sejul;
  content: Content;
  thumbnail?: Thumbnail;
  categoryId?: CategoryId;
  tags: string[];
}

export interface UpdatePublishedRequestDTO {
  rating: Rating;
  sejul: Sejul;
  content: Content;
  thumbnail: Thumbnail;
  categoryId: CategoryId;
  tags: string[];
}
