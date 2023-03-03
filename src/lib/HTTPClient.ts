import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.SEJULBOOK_BASE_URL,
});

export const get = async <T>(url: string, params = {}, headers = {}) => {
  const response = await axiosInstance.get(url, { params, headers });
  return response.data as T;
};

export const post = async <T>(url: string, body: unknown, headers = {}) => {
  const response = await axiosInstance.post(url, body, { headers });
  return response.data as T;
};

const httpClient = { get, post };

export default httpClient;
