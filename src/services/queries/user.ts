import { signOut } from 'next-auth/react';
import { getUser } from '@/services/api/user';
import { UserId } from '@/types/features/user';
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
