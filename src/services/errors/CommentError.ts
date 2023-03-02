import ErrorBase from '@/lib/ErrorBase';

type CommentErrorName = 'GET_COMMENTS_ERROR';

class CommentError extends ErrorBase<CommentErrorName> {}

export default CommentError;
