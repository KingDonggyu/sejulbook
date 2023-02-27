import Query from '@/types/query';
import { getCategories } from '../api/bookReview';

const BASE_QUERY_KEY = 'bookReview';

export const getCategoriesQuery: Query = {
  queryKey: [`${BASE_QUERY_KEY}_getCategories`],
  queryFn: () => getCategories(),
};
