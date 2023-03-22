import { signOut } from 'next-auth/react';
import { getFollowUserList, getUser } from '@/services/api/user';
import { FollowUserListRequst, UserId } from '@/types/features/user';
import Query from '@/types/query';

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
  userId,
}: Pick<FollowUserListRequst, 'userId'>): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getFollowingUserListInfinityQuery`, userId],
  queryFn: () => getFollowUserList({ userId, isFollowing: true }),
});

export const getFollowerUserListInfinityQuery = ({
  userId,
}: Pick<FollowUserListRequst, 'userId'>): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getFollowerUserListInfinityQuery`, userId],
  queryFn: () => getFollowUserList({ userId, isFollowing: false }),
});
