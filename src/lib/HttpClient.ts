import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import ExceptionBase from './HttpErrorException';

class HttpClient {
  private axios;

  constructor() {
    this.axios = axios.create({ baseURL: '/api' });
    this.setResponseInterception();
  }

  // eslint-disable-next-line class-methods-use-this
  protected checkIsSSR() {
    return typeof window === 'undefined';
  }

  protected async getRequest<Response = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ) {
    const res = await this.axios.get<Response>(url, config);
    return res.data;
  }

  protected async postRequset<Response = unknown, Request = unknown>(
    url: string,
    body?: Request,
    config?: AxiosRequestConfig,
  ) {
    const res = await this.axios.post<Response>(url, body, config);
    return res.data;
  }

  protected async deleteRequest<Response = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ) {
    const res = await this.axios.delete<Response>(url, config);
    return res.data;
  }

  protected async putRequest<Response = unknown, Request = unknown>(
    url: string,
    body?: Request,
    config?: AxiosRequestConfig,
  ) {
    const res = await this.axios.put<Response>(url, body, config);
    return res.data;
  }

  private setResponseInterception() {
    this.axios.interceptors.response.use(
      (response) => response,
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
