import { QueryClient } from '@tanstack/react-query';
import Query, { InfiniteQuery } from '@/types/query';

const prefetchQuery = async (
  queries: Query[],
  infinityQueries: InfiniteQuery[] = [],
) => {
  const queryClient = new QueryClient();

  let promises = queries.map(async ({ queryKey, queryFn }) => {
    await queryClient.prefetchQuery(queryKey, queryFn);
  });

  await Promise.all(promises);

  promises = infinityQueries.map(async ({ queryKey, queryFn }) => {
    await queryClient.prefetchInfiniteQuery(queryKey, () =>
      queryFn({ pageParam: null }),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryClient.setQueryData(queryKey, (data: any) => ({
      ...data,
      pageParams: [null],
    }));
  });

  await Promise.all(promises);

  return queryClient;
};

export default prefetchQuery;
