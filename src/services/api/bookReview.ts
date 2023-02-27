import { PresignedPost } from '@aws-sdk/s3-presigned-post';
import { get, post } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import {
  BookReview,
  Category,
  PublishRequest,
} from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import { bookReviewError } from '@/constants/message';
import { BookReviewError } from '../errors/BookReviewError';

const API_URL = '/api/bookreview';

export const getPresignedURL = async (fileInfo: {
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

export const uploadLocalImage = async (blob: Blob) => {
  try {
    const response = await getPresignedURL({
      fileName: blob.name,
      fileType: blob.type,
    });
    const { url, fields } = response;
    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('file', new File([blob], blob.name));

    await post(url, formData);

    return `${url}${fields.key}`;
  } catch (error) {
    throw new BookReviewError({
      name: 'IMAGE_UPLOAD_ERROR',
      message: bookReviewError.WRONG_FILE_FORMAT,
    });
  }
};

export const getCategories = async () => {
  try {
    const response = await get<HttpResponse<Category[]>>(
      `${API_URL}/categories`,
    );

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

export const publishBookReview = async ({
  bookReview,
  userId,
}: {
  bookReview: BookReview;
  userId: UserId;
}) => {
  try {
    const publishRequest: PublishRequest = {
      ...bookReview,
      bookname: bookReview.book.title,
      authors: bookReview.book.authors.join(', '),
      publication: bookReview.book.datetime,
      publisher: bookReview.book.publisher,
      categoryId: bookReview.category.id,
      isDraftSave: false,
      userId,
    };

    const response = await post<HttpResponse<undefined>>(
      `${API_URL}/publish`,
      publishRequest,
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'PUBLISH_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'PUBLISH_ERROR', message });
  }
};
