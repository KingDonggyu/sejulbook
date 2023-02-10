type BookISBN = { isbn: string };
export type BookTitle = { title: string };
export type BookThumbnail = { thumbnail: string | undefined };
export type BookAuthors = { authors: string[] };
export type BookPublisher = { publisher: string };

export type BookSearchedItem = BookISBN &
  BookTitle &
  BookThumbnail &
  BookAuthors &
  BookPublisher;

export type Book = {
  datetime: string;
} & BookSearchedItem;

export interface BookResponse {
  documents: Book[];
}
