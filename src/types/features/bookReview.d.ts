import { Book, BookThumbnail } from './book';
import { UserName } from './user';

export type Category = { id: number; category: string };

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
