import useInfiniteQuery from '@/lib/react-query/hooks/useInfiniteQuery';
import type { InfiniteQuery } from '@/lib/react-query/types/query';
import UserRepository from '@/repository/api/UserRepository';
import useUserStatus from '@/hooks/useUserStatus';

type Request = { myUserId?: number; pageParam?: number | null };

type FollowerResponse = Awaited<
  ReturnType<UserRepository['getPagedFollowers']>
>;

type FollowingResponse = Awaited<
  ReturnType<UserRepository['getPagedFollowings']>
>;

export const getFollowerListInfiniteQuery = ({
  myUserId,
  pageParam = null,
}: Request): InfiniteQuery<FollowerResponse> => ({
  queryKey: ['user_getPagedFollowers'],
  queryFn: () => {
    if (!myUserId) {
      return [];
    }
    return new UserRepository().getPagedFollowers({
      id: myUserId,
      targetId: pageParam,
    });
  },
});

export const getFollowingListInfiniteQuery = ({
  myUserId,
  pageParam = null,
}: Request): InfiniteQuery<FollowingResponse> => ({
  queryKey: ['user_getPagedFollowings'],
  queryFn: () => {
    if (!myUserId) {
      return [];
    }
    return new UserRepository().getPagedFollowings({
      id: myUserId,
      targetId: pageParam,
    });
  },
});

const useInfiniteFollowUserList = (isFollowing: boolean) => {
  const { session, isLogin } = useUserStatus();
  const myUserId = isLogin ? session.id : undefined;

  const infiniteQuery = isFollowing
    ? getFollowingListInfiniteQuery({ myUserId })
    : getFollowerListInfiniteQuery({ myUserId });

  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    ...infiniteQuery,
    options: {
      getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.length) {
          return undefined;
        }
        return lastPage[lastPage.length - 1].nextTargetId;
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
