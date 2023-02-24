import { post } from '@/lib/HTTPClient';
import { HttpResponse } from '@/types/http';
import { SignUpRequset } from '@/types/features/user';
import getDataFromAxiosError from '@/utils/getDataFromAxiosError';
import { UserError } from '../errors';

const API_URL = '/api/users';

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
