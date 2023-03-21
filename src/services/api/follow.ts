import { get, post, remove } from '@/lib/HTTPClient';
import {
  FollowInfoRequest,
  FollowInfoResponse,
  SubscribeRequest,
} from '@/types/features/follow';
import { HttpResponse } from '@/types/http';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import FollowError from '../errors/FollowError';

const API_URL = '/api/follow';

export const subscribe = async ({
  targetUserId,
  myUserId,
}: SubscribeRequest) => {
  try {
    const response = await post<HttpResponse<undefined>>(
      `${API_URL}/subscribe`,
      {
        targetUserId,
        myUserId,
      },
    );

    if (response.error) {
      throw new FollowError({
        name: 'SUBSCRIBE_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new FollowError({ name: 'SUBSCRIBE_ERROR', message });
  }
};

export const unsubscribe = async ({
  targetUserId,
  myUserId,
}: SubscribeRequest) => {
  try {
    const response = await remove<HttpResponse<undefined>>(
      `${API_URL}/${targetUserId}`,
      {
        myId: myUserId,
      },
    );

    if (response.error) {
      throw new FollowError({
        name: 'UNSUBSCRIBE_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new FollowError({ name: 'UNSUBSCRIBE_ERROR', message });
  }
};

export const getFollowInfo = async ({
  targetUserId,
  myUserId,
}: FollowInfoRequest) => {
  try {
    const response = await get<HttpResponse<FollowInfoResponse>>(
      `${API_URL}/${targetUserId}`,
      {
        myId: myUserId,
      },
    );

    if (response.error) {
      throw new FollowError({
        name: 'GET_FOLLOW_INFO_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new FollowError({ name: 'GET_FOLLOW_INFO_ERROR', message });
  }
};
