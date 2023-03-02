import { get } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import { BookReviewId } from '@/types/features/bookReview';
import { TagResponse } from '@/types/features/tag';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import { BookReviewError } from '../errors/BookReviewError';

const API_URL = '/api/tags';

export const getTags = async (bookReviewId: BookReviewId) => {
  try {
    const response = await get<HttpResponse<TagResponse>>(
      `${API_URL}/${bookReviewId}`,
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_TAGS_ERROR',
        message: response.message,
      });
    }

    return response.data.map(({ tag }) => tag);
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'GET_TAGS_ERROR', message });
  }
};
