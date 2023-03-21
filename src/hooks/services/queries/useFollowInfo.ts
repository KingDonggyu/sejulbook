import useQuery from '@/hooks/useQuery';
import { getFollowInfoQuery } from '@/services/queries/follow';
import { FollowInfoResponse } from '@/types/features/follow';
import { UserId } from '@/types/features/user';
import useMe from './useMe';

const useFollowInfo = (userId: UserId) => {
  const me = useMe();
  const { data: followInfo } = useQuery<FollowInfoResponse>(
    getFollowInfoQuery({ targetUserId: userId, myUserId: me?.id }),
  );

  return followInfo;
};

export default useFollowInfo;
