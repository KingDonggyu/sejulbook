import type { GetBookResponse } from 'book';
import HttpClient from '@/lib/HttpClient';

class BookRepository extends HttpClient {
  private baseUrl = 'books/title';

  private authToken = `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`;

  search(query: string) {
    return this.axiosInstance.get<never, GetBookResponse>(this.baseUrl, {
      params: { query },
      headers: { Authorization: this.authToken },
    });
  }
}

export default BookRepository;
