import TagService, { BookReviewId } from 'server/services/tag/tag.service';

class TagRepository {
  private service = new TagService();

  get(bookReviewId: BookReviewId) {
    return this.service.findAllByBookReview(bookReviewId);
  }

  search(query: string) {
    return this.service.findAllByTagName(query);
  }
}

export default TagRepository;
