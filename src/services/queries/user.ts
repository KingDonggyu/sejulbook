import { signOut } from 'next-auth/react';
import { getFollowUserList, getUser } from '@/services/api/user';
import { FollowUserListRequst, UserId } from '@/types/features/user';
import Query, { InfiniteQuery } from '@/types/query';

const BASE_QUERY_KEY = 'user';

export const getUserQuery = (userId?: UserId, onError?: () => void): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getUser`, userId],
  queryFn: () => userId && getUser(userId),
  options: {
    enabled: !!userId,
    onError: () => {
      signOut();
      if (onError) {
        onError();
      }
    },
  },
});

export const getFollowingUserListInfinityQuery = ({
  myUserId,
  targetUserId,
}: Omit<FollowUserListRequst, 'pageParam'>): InfiniteQuery => ({
  queryKey: [
    `${BASE_QUERY_KEY}_getFollowingUserListInfinityQuery`,
    targetUserId,
  ],
  queryFn: ({ pageParam }: Pick<FollowUserListRequst, 'pageParam'>) =>
    getFollowUserList({
      pageParam,
      myUserId,
      targetUserId,
      isFollowing: true,
    }),
});

export const getFollowerUserListInfinityQuery = ({
  myUserId,
  targetUserId,
}: Omit<FollowUserListRequst, 'pageParam'>): InfiniteQuery => ({
  queryKey: [
    `${BASE_QUERY_KEY}_getFollowerUserListInfinityQuery`,
    targetUserId,
  ],
  queryFn: ({ pageParam }: Pick<FollowUserListRequst, 'pageParam'>) =>
    getFollowUserList({
      pageParam,
      myUserId,
      targetUserId,
      isFollowing: false,
    }),
});
