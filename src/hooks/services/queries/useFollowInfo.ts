import useQuery from '@/lib/react-query/useQuery';
import type { Query } from '@/lib/react-query/query';
import FollowRepository from '@/repository/api/FollowRepository';
import useUserStatus from '@/hooks/useUserStatus';

type Request = Parameters<FollowRepository['get']>[0];
type Response = Awaited<ReturnType<FollowRepository['get']>>;

export const getFollowInfoQuery = ({
  targetUserId,
  myUserId,
}: Request): Query<Response> => ({
  queryKey: ['follow_get', targetUserId],
  queryFn: () => new FollowRepository().get({ myUserId, targetUserId }),
});

const useFollowInfo = (targetUserId: number) => {
  const { session, isLogin } = useUserStatus();
  const myUserId = isLogin ? session.id : undefined;

  const { data: followInfo, isLoading } = useQuery<Response>(
    getFollowInfoQuery({ targetUserId, myUserId }),
  );

  return { followInfo, isLoading };
};

export default useFollowInfo;
