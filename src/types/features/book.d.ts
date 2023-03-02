type BookISBN = string;
export type BookTitle = string;
export type BookAuthor = string;
export type BookThumbnail = string | undefined;
export type BookAuthors = BookAuthor[];
export type BookPublisher = string;
export type BookPublication = string;

export interface BookSearchedItem {
  isbn?: BookISBN;
  title: BookTitle;
  thumbnail: BookThumbnail;
  authors: BookAuthors;
  publisher: BookPublisher;
}

export interface Book extends BookSearchedItem {
  datetime: BookPublication;
}

export interface BookResponse {
  documents: Book[];
}
