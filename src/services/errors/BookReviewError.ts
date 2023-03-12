import ErrorBase from '@/lib/ErrorBase';

export type BookReviewErrorName =
  | 'IMAGE_UPLOAD_ERROR'
  | 'GET_CATEGORIES_ERROR'
  | 'GET_TAGS_ERROR'
  | 'PUBLISH_ERROR'
  | 'UPDATE_ERROR'
  | 'GET_BOOKREIVEW_LIST_ERROR'
  | 'GET_BOOKREVIEW_ERROR'
  | 'GET_DRAFT_SAVED_LIST_ERROR'
  | 'DELETE_BOOKREVIEW_ERROR'
  | 'LIKE_ERROR'
  | 'UNLIKE_ERROR'
  | 'CHECK_IS_LIKE_ERROR';

export class BookReviewError extends ErrorBase<BookReviewErrorName> {}
