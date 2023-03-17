import { get, post, remove } from '@/lib/HTTPClient';
import { LikeRequest, LikeResponse } from '@/types/features/like';
import { HttpResponse } from '@/types/http';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import { BookReviewError } from '../errors/BookReviewError';

const API_URL = '/api/like';

export const like = async ({ userId, bookReviewId }: LikeRequest) => {
  try {
    const response = await post<HttpResponse<undefined>>(API_URL, {
      userId,
      bookReviewId,
    });

    if (response.error) {
      throw new BookReviewError({
        name: 'LIKE_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'LIKE_ERROR', message });
  }
};

export const unlike = async ({ userId, bookReviewId }: LikeRequest) => {
  try {
    const response = await remove<HttpResponse<undefined>>(API_URL, {
      userId,
      bookReviewId,
    });

    if (response.error) {
      throw new BookReviewError({
        name: 'UNLIKE_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'UNLIKE_ERROR', message });
  }
};

export const getLikeStatus = async ({ userId, bookReviewId }: LikeRequest) => {
  try {
    const response = await get<HttpResponse<LikeResponse>>(API_URL, {
      userId,
      bookReviewId,
    });

    if (response.error) {
      throw new BookReviewError({
        name: 'CHECK_IS_LIKE_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'CHECK_IS_LIKE_ERROR', message });
  }
};
