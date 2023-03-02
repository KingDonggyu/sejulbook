import useQuery from '@/hooks/useQuery';
import { getCategoriesQuery } from '@/services/queries/bookReview';
import { CategoryResponse } from '@/types/features/category';

const useCategories = () => {
  const { data: categories } = useQuery<CategoryResponse[]>(getCategoriesQuery);
  return categories;
};

export default useCategories;
