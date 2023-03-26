import { get } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import { BookReviewId } from '@/types/features/bookReview';
import { SearchedTag, Tag, TagResponse } from '@/types/features/tag';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import { TagError } from '../errors/TagError';

const API_URL = '/api/tags';

export const getTags = async (bookReviewId: BookReviewId) => {
  try {
    const response = await get<HttpResponse<TagResponse>>(
      `${API_URL}/${bookReviewId}`,
    );

    if (response.error) {
      throw new TagError({
        name: 'GET_TAGS_ERROR',
        message: response.message,
      });
    }

    return response.data.map(({ tag }) => tag);
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new TagError({ name: 'GET_TAGS_ERROR', message });
  }
};

export const searchTags = async (query: Tag) => {
  try {
    const response = await get<HttpResponse<SearchedTag[]>>(
      `${API_URL}/search`,
      {
        query,
      },
    );

    if (response.error) {
      throw new TagError({
        name: 'SERACH_TAG_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new TagError({ name: 'SERACH_TAG_ERROR', message });
  }
};
