import Query, { InfiniteQuery } from '@/types/query';
import {
  BookReviewId,
  BookReviewListRequest,
  FollowingBookReviewListRequest,
} from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

import {
  getBookReview,
  getBookReviewList,
  getDraftSavedList,
  getFollowingBookReviewList,
  getMostLikedBookReviewList,
  getPagingBookReviewList,
  getPagingBookReviewListByCategory,
  getPagingBookReviewListByTag,
  getPagingFollowingBookReviewList,
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

export const getBookReviewListInfinityQuery = ({
  query,
}: Pick<BookReviewListRequest, 'query'>): InfiniteQuery => ({
  queryKey: [`${BASE_QUERY_KEY}_getBookReviewListInfinityQuery`, query],
  queryFn: ({ pageParam }: Pick<BookReviewListRequest, 'pageParam'>) =>
    getPagingBookReviewList({ query, pageParam }),
});

export const getBookReviewListByTagInfinityQuery = ({
  query,
}: Pick<BookReviewListRequest, 'query'>): InfiniteQuery => ({
  queryKey: [`${BASE_QUERY_KEY}_getBookReviewListByTagInfinityQuery`, query],
  queryFn: ({ pageParam }: Pick<BookReviewListRequest, 'pageParam'>) =>
    getPagingBookReviewListByTag({ query, pageParam }),
});

export const getBookReviewListByCategoryInfinityQuery = ({
  query,
}: Pick<BookReviewListRequest, 'query'>): InfiniteQuery => ({
  queryKey: [
    `${BASE_QUERY_KEY})_getBookReviewListByCategoryInfinityQuery`,
    query,
  ],
  queryFn: ({ pageParam }: Pick<BookReviewListRequest, 'pageParam'>) =>
    getPagingBookReviewListByCategory({ query, pageParam }),
});

export const getFollowingBookReviewListInfinityQuery = ({
  userId,
}: {
  userId?: UserId;
}): InfiniteQuery => ({
  queryKey: [`${BASE_QUERY_KEY}_getFollowingBookReviewListInfinityQuery`],
  queryFn: ({ pageParam }: Pick<FollowingBookReviewListRequest, 'pageParam'>) =>
    userId && getPagingFollowingBookReviewList({ userId, pageParam }),
  options: {
    enabled: !!userId,
  },
});

export const getCategoriesQuery: Query = {
  queryKey: [`${BASE_QUERY_KEY}_getCategories`],
  queryFn: () => getCategories(),
};
