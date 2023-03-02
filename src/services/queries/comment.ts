import { BookReviewId } from '@/types/features/bookReview';
import Query from '@/types/query';
import { getComments } from '../api/comment';

const BASE_QUERY_KEY = 'comment';

export const getCommentsQuery = (bookReviewId: BookReviewId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getComments`, bookReviewId],
  queryFn: () => getComments(bookReviewId),
});
