import { QueryClient } from '@tanstack/react-query';
import Query from '@/types/query';

const prefetchQuery = async (queries: Query[]) => {
  const queryClient = new QueryClient();

  const promises = queries.map(async ({ queryKey, queryFn, options }) => {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn: () => queryFn(),
      ...options,
    });
  });

  await Promise.all(promises);

  return queryClient;
};

export default prefetchQuery;
