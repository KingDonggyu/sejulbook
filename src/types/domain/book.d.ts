type BookISBN = string;
export type BookTitle = string;
export type BookThumbnail = string | undefined;
export type BookAuthors = string[];
export type BookPublisher = string;

export interface BookSearchedItem {
  isbn: BookISBN;
  title: BookTitle;
  thumbnail: BookThumbnail;
  authors: BookAuthors;
  publisher: BookPublisher;
}

export interface Book extends BookSearchedItem {
  datetime: string;
}

export interface BookResponse {
  documents: Book[];
}
