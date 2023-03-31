import { QueryClient } from '@tanstack/react-query';
import Query, { InfiniteQuery } from '@/types/query';

const prefetchQuery = async (
  queries: Query[],
  infinityQueries: InfiniteQuery[] = [],
) => {
  const queryClient = new QueryClient();

  await Promise.allSettled([
    ...queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery(queryKey, queryFn),
    ),
    ...infinityQueries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchInfiniteQuery(queryKey, () =>
        queryFn({ pageParam: null }),
      ),
    ),
  ]);

  infinityQueries.forEach(({ queryKey }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryClient.setQueryData(queryKey, (data: any) => ({
      ...data,
      pageParams: [null],
    }));
  });

  return queryClient;
};

export default prefetchQuery;
