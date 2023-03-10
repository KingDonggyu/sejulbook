import { get } from '@/lib/HTTPClient';
import { BookResponse, BookTitle } from '@/types/features/book';

const API_URL = '/api/books/title';
const AUTH_TOKEN = `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`;

export const getBooksByTitle = async (title: BookTitle) => {
  const response = await get<BookResponse>(
    API_URL,
    { query: title },
    { Authorization: AUTH_TOKEN },
  );

  return response;
};
