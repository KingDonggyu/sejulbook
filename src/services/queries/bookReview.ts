import Query from '@/types/query';
import { BookReviewId } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

import {
  getBookReview,
  getBookReviewList,
  getDraftSavedList,
  getFollowingBookReviewList,
  getMostLikedBookReviewList,
} from '../api/bookReview';
import { getCategories } from '../api/category';
import { getTags } from '../api/tag';

const BASE_QUERY_KEY = 'bookReview';

export const getMostLikedBookReviewListQuery: Query = {
  queryKey: [`${BASE_QUERY_KEY}_getMostLikedBookReviewListQuery`],
  queryFn: () => getMostLikedBookReviewList(),
};

export const getFollowingBookReviewListQuery = (userId?: UserId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getFollowingBookReviewListQuery`, userId],
  queryFn: () => userId && getFollowingBookReviewList(userId),
  options: {
    enabled: !!userId,
  },
});

export const getBookReviewListQuery = (userId: UserId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getBookReviewListQuery`, userId],
  queryFn: () => getBookReviewList(userId),
});

export const getBookReviewQuery = (bookReviewId?: BookReviewId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getBookReviewQuery`, bookReviewId],
  queryFn: () => bookReviewId && getBookReview(bookReviewId),
  options: {
    enabled: !!bookReviewId,
  },
});

export const getDraftSavedListQuery = (myId: UserId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getDraftSavedListQuery`],
  queryFn: () => getDraftSavedList(myId),
});

export const getTagsQuery = (bookReviewId?: BookReviewId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getTagsQuery`, bookReviewId],
  queryFn: () => bookReviewId && getTags(bookReviewId),
  options: {
    enabled: !!bookReviewId,
  },
});

export const getCategoriesQuery: Query = {
  queryKey: [`${BASE_QUERY_KEY}_getCategories`],
  queryFn: () => getCategories(),
};
