declare module 'comment' {
  export type Id = number;
  export type BookReviewId = number;
  export type CommenterId = number;
  export type Content = string;
  export type CreatedAt = string;

  export interface CreateCommentRequest {
    bookReviewId: BookReviewId;
    commenterId: CommenterId;
    content: Content;
  }

  export interface UpdateCommentRequest {
    id: Id;
    content: Content;
  }

  export interface GetCommentResponse {
    id: Id;
    bookReviewId: BookReviewId;
    commenterId: CommenterId;
    content: Content;
    createdAt: CreatedAt;
  }
}
