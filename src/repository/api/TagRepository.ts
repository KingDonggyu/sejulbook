import HttpClient from '@/lib/HttpClient';
import TagService from '@/server/services/tag.service';
import type { BookReviewId, GetTagResponse } from 'tag';

class TagRepository extends HttpClient {
  private service: TagService | null;

  private baseUrl = 'tag';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new TagService() : null;
  }

  get(bookReviewId: BookReviewId): Promise<GetTagResponse[]> {
    if (this.service) {
      return this.service.findAllByBookReview(bookReviewId);
    }
    return this.axiosInstance(`${this.baseUrl}/${bookReviewId}`);
  }

  search(query: string) {
    if (this.service) {
      return this.service.findAllByTagName(query);
    }
    return this.axiosInstance(`${this.baseUrl}/search`, { params: { query } });
  }
}

export default TagRepository;
