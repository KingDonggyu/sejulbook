import type { GetBookResponse } from 'book';
import HttpClient from '@/lib/HttpClient';

class BookRepository extends HttpClient {
  private baseUrl = '/book';

  search(query: string) {
    return this.getRequest<GetBookResponse>(this.baseUrl, {
      params: { query },
    });
  }
}

export default BookRepository;
