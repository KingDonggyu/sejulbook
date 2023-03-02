import ErrorBase from '@/lib/ErrorBase';

type BookReviewErrorName =
  | 'IMAGE_UPLOAD_ERROR'
  | 'GET_CATEGORIES_ERROR'
  | 'GET_TAGS_ERROR'
  | 'PUBLISH_ERROR'
  | 'GET_BOOKREIVEW_LIST_ERROR'
  | 'GET_BOOKREVIEW_ERROR';

export class BookReviewError extends ErrorBase<BookReviewErrorName> {}
