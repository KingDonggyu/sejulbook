import { Book } from './book';

export type Category =
  | '소설'
  | '시/에세이'
  | '인문'
  | '가정/육아'
  | '요리'
  | '건강'
  | '취미/실용/스포츠'
  | '경제/경영'
  | '자기계발'
  | '정치/사회'
  | '역사/문화'
  | '종교'
  | '예술/대중문화'
  | '기술/공학'
  | '외국어'
  | '과학'
  | '취업/수험서'
  | '여행'
  | '컴퓨터/IT'
  | '만화';

export type Tag = string;

export type TagList = Set<Tag>;

export type BookReview = {
  category: Category;
  tag: TagList;
} & Book;
