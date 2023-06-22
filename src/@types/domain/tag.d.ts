declare module 'tag' {
  export type Id = number;
  export type Tag = string;
  export type BookReviewId = number;

  export interface CreateTagReqeust {
    bookReviewId: BookReviewId;
    tags: Tag[];
  }

  export interface GetTagResponse {
    id: Id;
    tag: Tag;
    bookReviewId: BookReviewId;
  }
}
