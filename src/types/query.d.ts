import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

interface Query {
  queryKey: QueryKey;
  queryFn: () => void;
  options?: UseQueryOptions;
}

export default Query;
