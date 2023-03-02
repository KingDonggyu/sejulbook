import {
  Book,
  BookAuthor,
  BookPublication,
  BookPublisher,
  BookThumbnail,
  BookTitle,
} from './book';
import { Category, CategoryId, CategoryResponse } from './category';
import { Tag, TagList } from './tag';
import { UserId, UserName } from './user';

export type BookReviewId = number;
export type Rating = number;
export type Sejul = string;
export type Content = string;

/**
 * 새 독후감 관련 타입
 */
export interface NewPublishInfo {
  thumbnail: BookThumbnail;
  category: CategoryResponse;
  rating: Rating;
  tag: TagList;
  sejul: Sejul;
  content: Content;
}

export interface NewBookReview extends NewPublishInfo {
  book: Book;
}

/**
 * 독후감 생성 요청 타입
 */
export interface PublishRequest {
  bookname: BookTitle;
  authors: BookAuthor;
  publication: BookPublication;
  publisher: BookPublisher;
  thumbnail: BookThumbnail;
  rating: Rating;
  tags: Tag[];
  sejul: Sejul;
  content: Content;
  userId: UserId;
  categoryId: CategoryId;
}

/**
 * 독후감 정보 응답 타입
 */
export interface BookReviewResponse
  extends Omit<PublishRequest, 'tags' | 'categoryId'> {
  id: BookReviewId;
  writer: UserName;
  category: Category;
  likeCount: number;
  createdAt: string;
}

export type BookReviewSummary = Pick<
  BookReviewResponse,
  'id' | 'bookname' | 'sejul' | 'thumbnail'
> & {
  likeCount: number;
  commentCount: number;
};

export type BookReivewList = BookReviewSummary[];
