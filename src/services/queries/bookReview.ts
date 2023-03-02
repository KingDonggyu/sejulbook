import { BookReviewId } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';
import Query from '@/types/query';
import {
  getBookReview,
  getBookReviewList,
  getCategories,
} from '../api/bookReview';

const BASE_QUERY_KEY = 'bookReview';

export const getBookReviewListQuery = (userId: UserId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getBookReviewListQuery`],
  queryFn: () => getBookReviewList(userId),
});

export const getBookReviewQuery = (bookReviewId: BookReviewId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getBookReviewQuery`],
  queryFn: () => getBookReview(bookReviewId),
});

export const getCategoriesQuery: Query = {
  queryKey: [`${BASE_QUERY_KEY}_getCategories`],
  queryFn: () => getCategories(),
};
