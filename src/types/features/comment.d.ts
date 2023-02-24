import { UserName } from './user';

export type CommentContent = string;

interface Comment {
  writer: UserName;
  content: CommentContent;
  createdAt: string;
}
