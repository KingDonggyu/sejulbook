import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import UserRepository from '@/repository/api/UserRepository';

type Response = Awaited<ReturnType<UserRepository['get']>> | undefined;

export const getUserQuery = (userId?: number): Query<Response> => ({
  queryKey: ['user_get', userId],
  queryFn: () => (userId ? new UserRepository().get(userId) : undefined),
});

const useUser = (userId?: number) => {
  const { data: user, isLoading } = useQuery<Response>(getUserQuery(userId));
  return { user, isLoading };
};

export default useUser;
