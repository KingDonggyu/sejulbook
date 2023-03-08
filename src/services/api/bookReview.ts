import { PresignedPost } from '@aws-sdk/s3-presigned-post';
import { get, post } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import {
  BookReivewList,
  NewBookReview,
  BookReviewId,
  PublishRequest,
  BookReviewResponse,
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

export const publishBookReview = async ({
  bookReview,
  userId,
  isDraftSave = false,
}: {
  bookReview: NewBookReview;
  userId: UserId;
  isDraftSave?: boolean;
}) => {
  try {
    const publishRequest: PublishRequest = {
      ...bookReview,
      bookname: bookReview.book.title,
      authors: bookReview.book.authors.join(', '),
      publication: bookReview.book.datetime.slice(0, 10),
      publisher: bookReview.book.publisher,
      thumbnail: bookReview.thumbnail || '',
      originThumbnail: bookReview.book.thumbnail,
      categoryId: bookReview.category.id,
      tags: Array.from(bookReview.tag),
      isDraftSave,
      userId,
    };

    const response = await post<HttpResponse<BookReviewId>>(
      `${API_URL}/publish`,
      publishRequest,
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'PUBLISH_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'PUBLISH_ERROR', message });
  }
};

export const draftSaveBookReview = async ({
  bookReview,
  userId,
}: {
  bookReview: NewBookReview;
  userId: UserId;
}) => {
  await publishBookReview({ bookReview, userId, isDraftSave: true });
};

export const getBookReviewList = async (userId: UserId) => {
  try {
    const response = await get<HttpResponse<BookReivewList>>(
      `${API_URL}/list`,
      { userId },
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_BOOKREIVEW_LIST_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'GET_BOOKREIVEW_LIST_ERROR', message });
  }
};

export const getDraftSavedList = async (userId: UserId) => {
  try {
    const response = await get<HttpResponse<BookReivewList>>(
      `${API_URL}/drafts`,
      { userId },
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_DRAFT_SAVED_LIST_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'GET_DRAFT_SAVED_LIST_ERROR', message });
  }
};

export const getBookReview = async (bookReviewId: BookReviewId) => {
  try {
    const response = await get<HttpResponse<BookReviewResponse>>(
      `${API_URL}/${bookReviewId}`,
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_BOOKREVIEW_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'GET_BOOKREVIEW_ERROR', message });
  }
};
