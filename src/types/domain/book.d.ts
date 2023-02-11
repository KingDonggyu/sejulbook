type BookISBN = string;
export type BookTitle = string;
export type BookThumbnail = string | undefined;
export type BookAuthors = string[];
export type BookPublisher = string;

export type BookSearchedItem = {
  isbn: BookISBN;
  title: BookTitle;
  thumbnail: BookThumbnail;
  authors: BookAuthors;
  publisher: BookPublisher;
};

export type Book = {
  datetime: string;
} & BookSearchedItem;

export interface BookResponse {
  documents: Book[];
}
