import Query from '@/types/query';
import { BookReviewId } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

import { getBookReview, getBookReviewList } from '../api/bookReview';
import { getCategories } from '../api/category';
import { getTags } from '../api/tag';

const BASE_QUERY_KEY = 'bookReview';

export const getBookReviewListQuery = (userId: UserId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getBookReviewListQuery`, userId],
  queryFn: () => getBookReviewList(userId),
});

export const getBookReviewQuery = (bookReviewId: BookReviewId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getBookReviewQuery`, bookReviewId],
  queryFn: () => getBookReview(bookReviewId),
});

export const getTagsQuery = (bookReviewId: BookReviewId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getTagsQuery`, bookReviewId],
  queryFn: () => getTags(bookReviewId),
});

export const getCategoriesQuery: Query = {
  queryKey: [`${BASE_QUERY_KEY}_getCategories`],
  queryFn: () => getCategories(),
};
