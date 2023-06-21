import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import CategoryRepository from '@/repository/api/CategoryRepository';

type Response = Awaited<ReturnType<CategoryRepository['get']>>;

export const CategoriesQuery: Query<Response> = {
  queryKey: ['category_get'],
  queryFn: new CategoryRepository().get,
};

const useCategories = () => {
  const { data: categories, isLoading } = useQuery<Response>(CategoriesQuery);
  return { categories, isLoading };
};

export default useCategories;
