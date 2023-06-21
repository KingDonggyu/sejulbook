import CommentService, {
  Id,
  BookReviewId,
  CommenterId,
  Content,
  CreateRequestDTO,
} from '@/server/services/comment/comment.service';
import HttpClient from '../../lib/HttpClient';

interface DeleteRequest {
  id: Id;
  bookReviewId: BookReviewId;
  commenterId: CommenterId;
}

interface UpdateRequest extends DeleteRequest {
  content: Content;
}

class CommentRepository extends HttpClient {
  private service = new CommentService();

  private baseUrl = '/comment';

  async create({ bookReviewId, commenterId, content }: CreateRequestDTO) {
    this.axiosInstance.post(
      `${this.baseUrl}/${bookReviewId}`,
      { content },
      { params: { commenterId } },
    );
  }

  async update({ id, bookReviewId, commenterId, content }: UpdateRequest) {
    this.axiosInstance.put(
      `${this.baseUrl}/${bookReviewId}`,
      { id, content },
      { params: { commenterId } },
    );
  }

  async delete({ id, bookReviewId, commenterId }: DeleteRequest) {
    this.axiosInstance.delete(`${this.baseUrl}/${bookReviewId}`, {
      params: { id, commenterId },
    });
  }

  get(bookReviewId: BookReviewId) {
    return this.service.findAllByBookReview(bookReviewId);
  }
}

export default CommentRepository;
