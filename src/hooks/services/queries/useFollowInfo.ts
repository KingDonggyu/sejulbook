import useQuery from '@/hooks/useQuery';
import useUserStatus from '@/hooks/useUserStatus';
import { getFollowInfoQuery } from '@/services/queries/follow';
import { FollowInfoResponse } from '@/types/features/follow';
import { UserId } from '@/types/features/user';

const useFollowInfo = (userId: UserId) => {
  const { session } = useUserStatus();
  const myUserId = session ? session.id || undefined : undefined;

  const { data: followInfo } = useQuery<FollowInfoResponse>(
    getFollowInfoQuery({ targetUserId: userId, myUserId }),
  );

  return followInfo;
};

export default useFollowInfo;
