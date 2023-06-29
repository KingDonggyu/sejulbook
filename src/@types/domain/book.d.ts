declare module 'book' {
  export type Title = string;
  export type Author = string;
  export type Thumbnail = string | undefined;
  export type Publisher = string;
  export type Publication = string;

  export interface Book {
    title: Title;
    authors: Author[];
    thumbnail: Thumbnail;
    publisher: Publisher;
    datetime: Publication;
  }

  export interface BookSearchedItem {
    title: Title;
    authors: Author;
    thumbnail: Thumbnail;
    publisher: Publisher;
  }

  export interface GetBookResponse {
    documents: (Omit<Book, 'authors'> & { authors: string[] })[];
  }
}
