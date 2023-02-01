import { Book } from './book';

export type Category = { category: string };

export type BookReview = Book & Category;
