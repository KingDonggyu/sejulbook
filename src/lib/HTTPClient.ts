import axios from 'axios';

class HttpClient {
  protected axiosInstance = axios.create({
    baseURL: `${process.env.SEJULBOOK_BASE_URL}/api/`,
  });

  constructor() {
    this.interceptResponse();
  }

  // eslint-disable-next-line class-methods-use-this
  protected checkIsSSR() {
    return typeof window === 'undefined';
  }

  private interceptResponse() {
    this.axiosInstance.interceptors.response.use(({ data }) => data);
  }
}

export default HttpClient;
