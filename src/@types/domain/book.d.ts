declare module 'book' {
  export interface Book {
    title: string;
    authors: string[];
    thumbnail?: string;
    publisher: string;
    datetime: string;
  }

  export interface BookSearchedItem {
    title: string;
    authors: string;
    thumbnail?: string;
    publisher: string;
  }

  export interface GetBookResponse {
    documents: (Omit<Book, 'authors'> & { authors: string[] })[];
  }
}
