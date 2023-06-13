export type Id = number;
export type BookReviewId = number;
export type CommenterId = number;

export default interface CommentDto {
  id: Id;
  bookReviewId: BookReviewId;
  commenterId: CommenterId;
  content: string;
  createdAt: Date;
}

export type CreateCommnetDto = Omit<CommentDto, 'id' | 'createdAt'>;
export type UpdateCommentDto = Pick<CommentDto, 'id' | 'content'>;
