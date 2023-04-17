import { PresignedPost } from '@aws-sdk/s3-presigned-post';
import { get, post, remove } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import {
  BookReivewList,
  NewBookReview,
  BookReviewId,
  PublishRequest,
  BookReviewResponse,
  HomeBookReviewSummary,
  FollowingBookReviewListRequest,
  FeedBookReviewSummary,
  BookReviewListRequest,
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
      createdAt: bookReview.createdAt,
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

export const getLatestBookReviewList = async () => {
  try {
    const response = await get<HttpResponse<HomeBookReviewSummary[]>>(
      `${API_URL}/list/latest`,
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_LATEST_BOOKREVIEW_LIST_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({
      name: 'GET_LATEST_BOOKREVIEW_LIST_ERROR',
      message,
    });
  }
};

export const getMostLikedBookReviewList = async () => {
  try {
    const response = await get<HttpResponse<HomeBookReviewSummary[]>>(
      `${API_URL}/list/liked`,
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_MOST_LIKED_BOOKREVIEW_LIST_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({
      name: 'GET_MOST_LIKED_BOOKREVIEW_LIST_ERROR',
      message,
    });
  }
};

export const getFollowingBookReviewList = async (userId: UserId) => {
  try {
    const response = await get<HttpResponse<HomeBookReviewSummary[]>>(
      `${API_URL}/list/following`,
      { userId },
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_FOLLOWING_BOOKREVIEW_LIST_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({
      name: 'GET_FOLLOWING_BOOKREVIEW_LIST_ERROR',
      message,
    });
  }
};

export const getBookReviewList = async (userId: UserId) => {
  try {
    const response = await get<HttpResponse<BookReivewList>>(
      `${API_URL}/list/${userId}`,
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

export const getBookReview = async (
  bookReviewId: BookReviewId,
  isSaveRequired?: boolean,
  onError?: () => void,
) => {
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

    if (isSaveRequired && response.data.isDraftSave) {
      throw new BookReviewError({
        name: 'GET_BOOKREVIEW_ERROR',
        message: '존재하지 않는 독후감입니다.',
      });
    }

    return response.data;
  } catch (error) {
    if (onError) {
      onError();
    }
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

export const getPagingBookReviewList = async ({
  query,
  pageParam = null,
}: BookReviewListRequest) => {
  try {
    const response = await get<HttpResponse<FeedBookReviewSummary[]>>(
      `${API_URL}/search/book`,
      {
        query,
        pageParam,
      },
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_PAGING_BOOKREVIEW_LIST_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({
      name: 'GET_PAGING_BOOKREVIEW_LIST_ERROR',
      message,
    });
  }
};

export const getPagingBookReviewListByCategory = async ({
  query,
  pageParam = null,
}: BookReviewListRequest) => {
  try {
    const response = await get<HttpResponse<FeedBookReviewSummary[]>>(
      `${API_URL}/search/category`,
      {
        query,
        pageParam,
      },
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_PAGING_BOOKREVIEW_LIST_BY_CATEGORY_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({
      name: 'GET_PAGING_BOOKREVIEW_LIST_BY_CATEGORY_ERROR',
      message,
    });
  }
};

export const getPagingBookReviewListByTag = async ({
  query,
  pageParam = null,
}: BookReviewListRequest) => {
  try {
    const response = await get<HttpResponse<FeedBookReviewSummary[]>>(
      `${API_URL}/search/tag`,
      {
        query,
        pageParam,
      },
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_PAGING_BOOKREVIEW_LIST_BY_TAG_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({
      name: 'GET_PAGING_BOOKREVIEW_LIST_BY_TAG_ERROR',
      message,
    });
  }
};

export const getPagingFollowingBookReviewList = async ({
  userId,
  pageParam = null,
}: FollowingBookReviewListRequest) => {
  try {
    const response = await get<HttpResponse<FeedBookReviewSummary[]>>(
      `${API_URL}/list/following/${userId}`,
      {
        pageParam,
      },
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_PAGING_FOLLOWING_BOOKREVIEW_LIST_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({
      name: 'GET_PAGING_FOLLOWING_BOOKREVIEW_LIST_ERROR',
      message,
    });
  }
};

export const getAllBookReviewId = async () => {
  try {
    const response = await get<HttpResponse<Pick<BookReviewResponse, 'id'>[]>>(
      `${API_URL}/list/all`,
    );

    if (response.error) {
      throw new BookReviewError({
        name: 'GET_ALL_BOOKREVIEW_ID_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new BookReviewError({
      name: 'GET_ALL_BOOKREVIEW_ID_ERROR',
      message,
    });
  }
};
