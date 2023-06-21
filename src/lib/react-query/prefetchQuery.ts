/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from '@tanstack/react-query';
import type { Query, InfiniteQuery } from './types/query';

const prefetchQuery = async (
  queries: Query<any>[],
  infinityQueries: InfiniteQuery<any>[] = [],
) => {
  const queryClient = new QueryClient();

  await Promise.all([
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
    queryClient.setQueryData(queryKey, (data: any) => ({
      ...data,
      pageParams: [null],
    }));
  });

  return queryClient;
};

export default prefetchQuery;
