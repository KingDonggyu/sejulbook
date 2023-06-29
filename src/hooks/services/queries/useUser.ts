import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import ExceptionBase from '@/lib/HttpErrorException';
import UserRepository from '@/repository/api/UserRepository';
import redirectAfterShowingErrorToast from '@/utils/redirectAfterShowingErrorToast';

type Response = Awaited<ReturnType<UserRepository['get']>> | undefined;

export const getUserQuery = (userId?: number): Query<Response> => ({
  queryKey: ['user_get', userId],
  queryFn: () =>
    userId
      ? new UserRepository().get(userId).catch((error: ExceptionBase) => {
          redirectAfterShowingErrorToast(error.message);
          return undefined;
        })
      : undefined,
  options: { enabled: !!userId },
});

const useUser = (userId?: number) => {
  const { data: user, isLoading } = useQuery<Response>(getUserQuery(userId));
  return { user, isLoading };
};

export default useUser;
