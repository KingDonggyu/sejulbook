import { PresignedPost } from '@aws-sdk/s3-presigned-post';
import { get } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import { BookReviewError } from '../errors/BookReviewError';

const API_URL = '/api/bookreview';

export const uploadImage = async (fileInfo: {
  fileName: string;
  fileType: string;
}) => {
  try {
    const response = await get<HttpResponse<PresignedPost>>(
      `${API_URL}/upload`,
      fileInfo,
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'IMAGE_UPLOAD_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'IMAGE_UPLOAD_ERROR', message });
  }
};
