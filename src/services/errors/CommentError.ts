import ErrorBase from '@/lib/ErrorBase';

type CommentErrorName =
  | 'GET_COMMENTS_ERROR'
  | 'ADD_COMMENT_ERROR'
  | 'DELETE_COMMENT_ERROR';

class CommentError extends ErrorBase<CommentErrorName> {}

export default CommentError;
