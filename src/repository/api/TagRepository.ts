import HttpClient from '@/lib/HttpClient';
import { TagService } from '@/server/services';
import type { BookReviewId, GetTagResponse, SearchTagResponse } from 'tag';

class TagRepository extends HttpClient {
  private service: TagService | null;

  private baseUrl = 'tag';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new TagService() : null;
  }

  httpGet(bookReviewId: BookReviewId): Promise<GetTagResponse[]> {
    if (this.service) {
      return this.service.findAllByBookReview(bookReviewId);
    }
    return this.getRequest(`${this.baseUrl}/${bookReviewId}`);
  }

  search(query: string): Promise<SearchTagResponse[]> {
    if (this.service) {
      return this.service.findAllByTagName(query);
    }
    return this.getRequest(`${this.baseUrl}/search`, { params: { query } });
  }
}

export default TagRepository;
