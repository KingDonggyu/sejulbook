import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import CategoryRepository from '@/repository/api/CategoryRepository';
import type { GetCategoryResponse } from 'category';

export const CategoriesQuery: Query<GetCategoryResponse[]> = {
  queryKey: ['category_get'],
  queryFn: () => new CategoryRepository().httpGet(),
};

const useCategories = () => {
  const { data: categories, isLoading } =
    useQuery<GetCategoryResponse[]>(CategoriesQuery);
  return { categories, isLoading };
};

export default useCategories;
