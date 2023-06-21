import HttpClient from '@/lib/HttpClient';
import TagService, { BookReviewId } from '@/server/services/tag/tag.service';

class TagRepository extends HttpClient {
  private service: TagService | null;

  private baseUrl = 'tag';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new TagService() : null;
  }

  get(bookReviewId: BookReviewId) {
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
