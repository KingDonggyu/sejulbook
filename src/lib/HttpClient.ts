import axios, { AxiosError } from 'axios';
import ExceptionBase from './HttpErrorException';

class HttpClient {
  protected axiosInstance = axios.create({
    baseURL: '/api',
  });

  constructor() {
    this.interceptResponse();
  }

  // eslint-disable-next-line class-methods-use-this
  protected checkIsSSR() {
    return typeof window === 'undefined';
  }

  private interceptResponse() {
    this.axiosInstance.interceptors.response.use(
      ({ data }) => data,
      (error: AxiosError<ExceptionBase>) => {
        if (error.response) {
          throw new ExceptionBase(error.response.data);
        }
        throw error;
      },
    );
  }
}

export default HttpClient;
