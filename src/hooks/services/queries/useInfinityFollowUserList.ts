import useInfiniteQuery from '@/hooks/useInfiniteQuery';
import { FollowUser, FollowUserListRequst } from '@/types/features/user';
import {
  getFollowerUserListInfinityQuery,
  getFollowingUserListInfinityQuery,
} from '@/services/queries/user';
import useUserStatus from '@/hooks/useUserStatus';

const useInfinityFollowUserList = ({
  targetUserId,
  isFollowing,
}: Pick<FollowUserListRequst, 'targetUserId'> & {
  isFollowing: boolean;
}) => {
  const { session } = useUserStatus();
  const myUserId = session ? session.id || undefined : undefined;

  const query = isFollowing
    ? getFollowingUserListInfinityQuery({ myUserId, targetUserId })
    : getFollowerUserListInfinityQuery({ myUserId, targetUserId });

  const { data, fetchNextPage } = useInfiniteQuery<FollowUser[]>({
    ...query,
    options: {
      getNextPageParam: (lastPage) => {
        const page = lastPage as FollowUser[];

        if (!page || !page.length) {
          return undefined;
        }

        return page[page.length - 1].followId;
      },
    },
  });

  return {
    followUserList: data,
    refetchNextFollowUserList: fetchNextPage,
  };
};

export default useInfinityFollowUserList;
