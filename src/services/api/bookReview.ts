import { PresignedPost } from '@aws-sdk/s3-presigned-post';
import { get, post, remove } from '@/lib/HTTPClient';
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
import {
  BookReviewError,
  BookReviewErrorName,
} from '../errors/BookReviewError';

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

interface PublishBookReviewProps {
  userId: UserId;
  bookReview: NewBookReview;
  bookReviewId?: BookReviewId;
  isDraftSave?: boolean;
}

export const publishBookReview = async ({
  userId,
  bookReview,
  bookReviewId,
  isDraftSave = false,
}: PublishBookReviewProps) => {
  const errorName: BookReviewErrorName = bookReviewId
    ? 'UPDATE_ERROR'
    : 'PUBLISH_ERROR';

  try {
    const publishRequest: PublishRequest = {
      ...bookReview,
      id: bookReviewId,
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
        name: errorName,
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: errorName, message });
  }
};

export const draftSaveBookReview = async ({
  userId,
  bookReview,
  bookReviewId,
}: PublishBookReviewProps) =>
  publishBookReview({
    userId,
    bookReview,
    bookReviewId,
    isDraftSave: true,
  });

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

interface DeleteBookReviewProps {
  userId: UserId;
  bookReviewId: BookReviewId;
}

export const deleteBookReview = async ({
  userId,
  bookReviewId,
}: DeleteBookReviewProps) => {
  try {
    const response = await remove<HttpResponse<undefined>>(
      `${API_URL}/${bookReviewId}`,
      {
        userId,
        bookReviewId,
      },
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'DELETE_BOOKREVIEW_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({ name: 'DELETE_BOOKREVIEW_ERROR', message });
  }
};
