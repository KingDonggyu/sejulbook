import { getUser } from '@/services/api/user';
import { UserId } from '@/types/features/user';
import Query from '@/types/query';

const BASE_QUERY_KEY = 'user';

export const getUserQuery = (userId: UserId): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getUser`, userId],
  queryFn: () => getUser(userId),
});
