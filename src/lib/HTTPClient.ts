import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});

export const get = async (url: string, params = {}, headers = {}) => {
  const response = await axiosInstance.get(url, { params, headers });
  console.log(response);
  return response.data;
};

export const post = async (url: string, body: unknown, headers = {}) => {
  const response = await axiosInstance.post(url, body, { headers });
  return response.data;
};

const httpClient = { get, post };

export default httpClient;
