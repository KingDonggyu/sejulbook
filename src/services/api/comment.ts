import { get, post, put, remove } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import { BookReviewId } from '@/types/features/bookReview';
import {
  CommentDeleteRequest,
  CommentRequest,
  CommentResponse,
  CommentUpdateRequest,
} from '@/types/features/comment';
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

export const addComment = async ({
  bookReviewId,
  commenterId,
  content,
}: CommentRequest) => {
  try {
    const response = await post<HttpResponse<undefined>>(
      `${API_URL}/${bookReviewId}`,
      {
        bookReviewId,
        commenterId,
        content,
      },
    );

    if (response.error) {
      throw new CommentError({
        name: 'ADD_COMMENT_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new CommentError({ name: 'ADD_COMMENT_ERROR', message });
  }
};

export const deleteComment = async ({
  id,
  userId,
  bookReviewId,
}: CommentDeleteRequest) => {
  try {
    const response = await remove<HttpResponse<undefined>>(
      `${API_URL}/${bookReviewId}`,
      { id, userId },
    );

    if (response.error) {
      throw new CommentError({
        name: 'DELETE_COMMENT_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new CommentError({ name: 'DELETE_COMMENT_ERROR', message });
  }
};

export const updateComment = async ({
  id,
  userId,
  content,
  bookReviewId,
}: CommentUpdateRequest) => {
  try {
    const response = await put<HttpResponse<undefined>>(
      `${API_URL}/${bookReviewId}`,
      { id, userId, content },
    );

    if (response.error) {
      throw new CommentError({
        name: 'UPDATE_COMMENT_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new CommentError({ name: 'UPDATE_COMMENT_ERROR', message });
  }
};
