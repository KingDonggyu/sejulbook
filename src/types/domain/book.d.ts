export type Title = string;

export interface Book {
  title: Title;
  authors: string[];
  publisher: string;
  datetime: string;
  thumbnail: string;
}

export interface BookResponse {
  documents: Book[];
}
