import useInfiniteQuery from '@/hooks/useInfiniteQuery';
import { FollowUser, FollowUserListRequst } from '@/types/features/user';
import {
  getFollowerUserListInfinityQuery,
  getFollowingUserListInfinityQuery,
} from '@/services/queries/user';

const useFollowUserList = ({
  userId,
  isFollowing,
}: Pick<FollowUserListRequst, 'userId'> & {
  isFollowing: boolean;
}) => {
  const getQuery = isFollowing
    ? getFollowingUserListInfinityQuery
    : getFollowerUserListInfinityQuery;

  const { data, fetchNextPage } = useInfiniteQuery<FollowUser[]>({
    ...getQuery({ userId }),
    options: {
      getNextPageParam: (lastPage) => {
        const page = lastPage as FollowUser[];

        if (!page.length) {
          return null;
        }

        return page[0].followId;
      },
    },
  });

  return {
    followUserList: data,
    refetchNextFollowUserList: fetchNextPage,
  };
};

export default useFollowUserList;
