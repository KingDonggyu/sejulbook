import { useQuery as useQueryOrigin } from '@tanstack/react-query';
import Query from '@/types/query';

const useQuery = <T>({ queryKey, queryFn, options }: Query) => {
  const result = useQueryOrigin({
    queryKey,
    queryFn: () => queryFn(),
    ...options,
  });

  return { ...result, data: result.data as T };
};

export default useQuery;
