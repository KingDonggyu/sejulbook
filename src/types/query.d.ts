import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

interface Query {
  queryKey: QueryKey;
  queryFn: () => unknown;
  options?: UseQueryOptions;
}

export default Query;
