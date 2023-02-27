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

export interface BookReview extends PublishInfo {
  book: Book;
}

export interface BookReviewPost extends BookReview {
  writer: UserName;
  createdAt: string;
}

export interface PublishRequest {
  bookname: BookTitle;
  authors: BookAuthor;
  publication: BookPublication;
  publisher: BookPublisher;
  thumbnail: BookThumbnail;
  rating: Rating;
  sejul: Sejul;
  content: Content;
  userId: UserId;
  categoryId: CategoryId;
  isDraftSave: false;
}
