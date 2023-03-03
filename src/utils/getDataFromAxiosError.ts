import { HttpFailed } from '@/types/http';
import { AxiosError } from 'axios';

const getDataFromAxiosError = (error: unknown) => {
  const { response } = error as AxiosError;

  if (response && 'data' in response) {
    const { data } = response as { data: HttpFailed };
    return data;
  }

  const data: HttpFailed = {
    error: true,
    code: 500,
    message: '예상치 못한 에러가 발생했습니다.',
  };

  return data;
};

export default getDataFromAxiosError;
