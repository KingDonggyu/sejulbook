import { CommenterId, Content } from '.';

export interface CreateCommentRequest {
  commenterId: CommenterId;
  content: Content;
}
