import { FollowInfoRequest } from '@/types/features/follow';
import Query from '@/types/query';
import { getFollowInfo } from '../api/follow';

const BASE_QUERY_KEY = 'follow';

export const getFollowInfoQuery = ({
  targetUserId,
  myUserId,
}: FollowInfoRequest): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getFollowInfoQuery`, targetUserId],
  queryFn: () => getFollowInfo({ targetUserId, myUserId }),
});
