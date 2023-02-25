import { useQuery as useQueryOrigin } from '@tanstack/react-query';
import Query from '@/types/query';

const useQuery = ({ queryKey, queryFn, options }: Query) =>
  useQueryOrigin({ queryKey, queryFn: () => queryFn(), ...options });

export default useQuery;
