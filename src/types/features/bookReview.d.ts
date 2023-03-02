import {
  Book,
  BookAuthor,
  BookPublication,
  BookPublisher,
  BookThumbnail,
  BookTitle,
} from './book';
import { UserId, UserName } from './user';

type CategoryId = number;

export type BookReviewId = number;
export type Category = { id: CategoryId; category: string };
export type Rating = number;
export type Tag = string;
export type TagList = Set<Tag>;
export type Sejul = string;
export type Content = string;

export interface PublishInfo {
  thumbnail: BookThumbnail;
  category: Category;
  rating: Rating;
  tag: TagList;
  sejul: Sejul;
  content: Content;
}

export interface NewBookReview extends PublishInfo {
  book: Book;
}

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

export interface BookReviewResponse
  extends Omit<PublishRequest, 'tags' | 'categoryId'> {
  id: BookReviewId;
  category: string;
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

export interface BookReviewPost extends NewBookReview {
  writer: UserName;
  createdAt: string;
}
