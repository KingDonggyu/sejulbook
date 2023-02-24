import { HttpFailed } from '@/types/http';
import { AxiosError } from 'axios';

const getDataFromAxiosError = (error: unknown) => {
  const { response } = error as AxiosError;
  const { data } = response as { data: HttpFailed };

  return data;
};

export default getDataFromAxiosError;
