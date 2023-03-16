import { get, post, put } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import { SignUpRequset, User, UserId } from '@/types/features/user';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import UserError from '../errors/UserError';

const API_URL = `/api/users`;

export const signUp = async (user: SignUpRequset) => {
  try {
    const response = await post<HttpResponse<undefined>>(
      `${API_URL}/signup`,
      user,
    );

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

export const getUser = async (userId: UserId) => {
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
