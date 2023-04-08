import { get, post, put } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import {
  FollowUser,
  FollowUserListRequst,
  SignUpRequset,
  User,
  UserId,
} from '@/types/features/user';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import UserError from '../errors/UserError';

const API_URL = `/api/users`;

export const signUp = async (user: SignUpRequset) => {
  try {
    const response = await post<HttpResponse<undefined>>(`${API_URL}/signup`, {
      ...user,
      age: user.age || null,
    });

    if (response.error) {
      throw new UserError({
        name: 'USER_SIGNUP_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new UserError({ name: 'USER_SIGNUP_ERROR', message });
  }
};

export const getUser = async (userId: UserId, onError?: () => void) => {
  try {
    const response = await get<HttpResponse<User>>(`${API_URL}/${userId}`);

    if (response.error) {
      throw new UserError({
        name: 'GET_USER_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    if (onError) {
      onError();
    }
    const { message } = getDataFromAxiosError(error);
    throw new UserError({ name: 'GET_USER_ERROR', message });
  }
};

export const updateUser = async ({ id, name, introduce }: User) => {
  try {
    const response = await put<HttpResponse<undefined>>(`${API_URL}/${id}`, {
      name,
      introduce,
    });

    if (response.error) {
      throw new UserError({
        name: 'UPDATE_USER_ERROR',
        message: response.message,
      });
    }
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new UserError({ name: 'UPDATE_USER_ERROR', message });
  }
};

export const getFollowUserList = async ({
  myUserId,
  targetUserId,
  isFollowing,
  pageParam = null,
}: FollowUserListRequst & { isFollowing: boolean }) => {
  try {
    const extraPath = isFollowing ? 'following' : 'follower';
    const response = await get<HttpResponse<FollowUser[]>>(
      `${API_URL}/list/${extraPath}`,
      { myUserId, targetUserId, pageParam },
    );

    if (response.error) {
      throw new UserError({
        name: isFollowing
          ? 'GET_FOLLOWING_USER_LIST_ERROR'
          : 'GET_FOLLOWER_USER_LIST_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new UserError({
      name: isFollowing
        ? 'GET_FOLLOWING_USER_LIST_ERROR'
        : 'GET_FOLLOWER_USER_LIST_ERROR',
      message,
    });
  }
};

export const searchUsers = async (query: string) => {
  try {
    const response = await get<HttpResponse<User[]>>(`${API_URL}/search`, {
      query,
    });

    if (response.error) {
      throw new UserError({
        name: 'SEARCH_USERS_ERROR',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new UserError({ name: 'SEARCH_USERS_ERROR', message });
  }
};

export const getAllUserId = async () => {
  try {
    const response = await get<HttpResponse<Pick<User, 'id'>[]>>(
      `${API_URL}/list/all`,
    );

    if (response.error) {
      throw new UserError({
        name: 'GET_ALL_USER_ID',
        message: response.message,
      });
    }

    return response.data;
  } catch (error) {
    const { message } = getDataFromAxiosError(error);
    throw new UserError({ name: 'GET_ALL_USER_ID', message });
  }
};
