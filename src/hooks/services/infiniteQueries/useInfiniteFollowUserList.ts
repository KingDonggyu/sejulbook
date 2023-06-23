import type { FollowDefaultReqeust, UserId } from 'follow';
import type { InfiniteQuery } from '@/lib/react-query/types/query';
import useInfiniteQuery from '@/lib/react-query/hooks/useInfiniteQuery';
import UserRepository from '@/repository/api/UserRepository';
import useUserStatus from '@/hooks/useUserStatus';

type FollowerResponse = Awaited<
  ReturnType<UserRepository['getPagedFollowers']>
>;

type FollowingResponse = Awaited<
  ReturnType<UserRepository['getPagedFollowings']>
>;

export const getFollowerListInfiniteQuery = ({
  targetUserId,
  myUserId,
}: FollowDefaultReqeust): InfiniteQuery<FollowerResponse> => ({
  queryKey: ['user_getPagedFollowers', targetUserId],
  queryFn: ({ pageParam }) => {
    if (!targetUserId) {
      return [];
    }
    return new UserRepository().getPagedFollowers({
      id: targetUserId,
      targetId: pageParam,
      myUserId,
    });
  },
});

export const getFollowingListInfiniteQuery = ({
  targetUserId,
  myUserId,
}: FollowDefaultReqeust): InfiniteQuery<FollowingResponse> => ({
  queryKey: ['user_getPagedFollowings', targetUserId],
  queryFn: ({ pageParam }) => {
    if (!targetUserId) {
      return [];
    }
    return new UserRepository().getPagedFollowings({
      id: targetUserId,
      targetId: pageParam,
      myUserId,
    });
  },
});

interface UseInfiniteFollowUserListOption {
  userId: UserId;
  isFollowing: boolean;
}

const useInfiniteFollowUserList = ({
  userId,
  isFollowing,
}: UseInfiniteFollowUserListOption) => {
  const { session, isLogin } = useUserStatus();
  const myUserId = isLogin ? session.id : null;

  const infiniteQuery = isFollowing
    ? getFollowingListInfiniteQuery({ targetUserId: userId, myUserId })
    : getFollowerListInfiniteQuery({ targetUserId: userId, myUserId });

  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    ...infiniteQuery,
    options: {
      getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.length) {
          return null;
        }
        return lastPage[lastPage.length - 1].id;
      },
    },
  });

  return {
    followUserList: data,
    refetchNextFollowUserList: fetchNextPage,
    isLoading,
  };
};

export default useInfiniteFollowUserList;
