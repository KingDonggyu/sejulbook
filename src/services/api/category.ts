import { get } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import { Category } from '@/types/features/category';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import { BookReviewError } from '../errors/BookReviewError';

const API_URL = '/api/categories';

export const getCategories = async () => {
  try {
    const response = await get<HttpResponse<Category[]>>(`${API_URL}/all`);

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_CATEGORIES_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'GET_CATEGORIES_ERROR', message });
  }
};
