import { get } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import { BookReviewId } from '@/types/features/bookReview';
import { CommentResponse } from '@/types/features/comment';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import CommentError from '../errors/CommentError';

const API_URL = '/api/comments';

export const getComments = async (bookReviewId: BookReviewId) => {
  try {
    const response = await get<HttpResponse<CommentResponse[]>>(
      `${API_URL}/${bookReviewId}`,
    );

    if (response.error) {
      throw new CommentError({
        name: 'GET_COMMENTS_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new CommentError({ name: 'GET_COMMENTS_ERROR', message });
  }
};
