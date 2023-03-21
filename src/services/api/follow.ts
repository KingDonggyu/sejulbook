import { get } from '@/lib/HTTPClient';
import { FollowInfoRequest, FollowInfoResponse } from '@/types/features/follow';
import { HttpResponse } from '@/types/http';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import FollowError from '../errors/FollowError';

const API_URL = '/api/follow';

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
