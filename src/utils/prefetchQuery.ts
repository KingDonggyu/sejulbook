import { QueryClient } from '@tanstack/react-query';
import Query from '@/types/query';

const prefetchQuery = async ({ queryKey, queryFn, options }: Query) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => queryFn(),
    ...options,
  });

  return queryClient;
};

export default prefetchQuery;
