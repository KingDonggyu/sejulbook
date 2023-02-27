import ErrorBase from '@/lib/ErrorBase';

type BookReviewErrorName = 'IMAGE_UPLOAD_ERROR' | 'GET_CATEGORIES_ERROR';

export class BookReviewError extends ErrorBase<BookReviewErrorName> {}
