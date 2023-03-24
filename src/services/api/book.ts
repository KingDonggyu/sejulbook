import { get } from '@/lib/HTTPClient';
import { BookAuthor, BookResponse, BookTitle } from '@/types/features/book';

const API_URL = '/api/books/title';
const AUTH_TOKEN = `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`;

export const getBooks = async (keyword: BookTitle | BookAuthor) => {
  const response = await get<BookResponse>(
    API_URL,
    { query: keyword },
    { Authorization: AUTH_TOKEN },
  );

  return response;
};
