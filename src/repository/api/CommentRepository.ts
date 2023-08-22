import { CommentService } from '@/server/services';
import HttpClient from '@/lib/HttpClient';

import type {
  Id,
  BookReviewId,
  CommenterId,
  Content,
  CreateCommentRequest,
} from 'comment';

interface DeleteRequest {
  id: Id;
  bookReviewId: BookReviewId;
  commenterId: CommenterId;
}

interface UpdateRequest extends DeleteRequest {
  content: Content;
}

class CommentRepository extends HttpClient {
  private service: CommentService | null;

  private baseUrl = '/comment';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new CommentService() : null;
  }

  async create({ bookReviewId, commenterId, content }: CreateCommentRequest) {
    await this.postRequset(
      `${this.baseUrl}/${bookReviewId}`,
      { content },
      { params: { commenterId } },
    );
  }

  async update({ id, bookReviewId, commenterId, content }: UpdateRequest) {
    await this.putRequest(
      `${this.baseUrl}/${bookReviewId}`,
      { id, content },
      { params: { commenterId } },
    );
  }

  async delete({ id, bookReviewId, commenterId }: DeleteRequest) {
    await this.deleteRequest(`${this.baseUrl}/${bookReviewId}`, {
      params: { id, commenterId },
    });
  }

  httpGet(
    bookReviewId: BookReviewId,
  ): ReturnType<CommentService['findAllByBookReview']> {
    if (this.service) {
      return this.service.findAllByBookReview(bookReviewId);
    }
    return this.getRequest(`${this.baseUrl}/${bookReviewId}`);
  }
}

export default CommentRepository;
