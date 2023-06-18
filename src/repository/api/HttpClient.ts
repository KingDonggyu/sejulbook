import axios from 'axios';

class HttpClient {
  protected axiosInstance = axios.create({
    baseURL: `${process.env.SEJULBOOK_BASE_URL}/api/`,
  });
}

export default HttpClient;
