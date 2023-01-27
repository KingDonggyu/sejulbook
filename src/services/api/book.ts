import { get } from '@/lib/HTTPClient';
import { BookResponse, Title } from '@/types/domain/book';

const API_URL = '/api/books/title';
const AUTH_TOKEN = `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`;

export const getBooksByTitle = async (title: Title) => {
  const response = await get(
    API_URL,
    { query: title },
    { Authorization: AUTH_TOKEN },
  );

  return response.data as BookResponse;
};
