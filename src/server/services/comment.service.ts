import { PrismaClient } from '@prisma/client';
import type {
  Id,
  BookReviewId,
  CommenterId,
  CreateCommentRequest,
  GetCommentResponse,
  UpdateCommentRequest,
} from 'comment';

class CommentService {
  private comment = new PrismaClient().comment;

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<GetCommentResponse[]> {
    const comments = await this.comment.findMany({ where: { bookReviewId } });
    return comments.map(({ createdAt, ...others }) => ({
      ...others,
      createdAt: createdAt.toString(),
    }));
  }

  async countByBookReview(bookReviewId: BookReviewId) {
    return this.comment.count({ where: { bookReviewId } });
  }

  async deleteAllByBookreview(bookReviewId: BookReviewId) {
    this.comment.deleteMany({ where: { bookReviewId } });
  }

  async deleteAllByUser(commenterId: CommenterId) {
    this.comment.deleteMany({ where: { commenterId } });
  }

  async delete(id: Id) {
    this.comment.delete({ where: { id } });
  }

  async create({ bookReviewId, commenterId, content }: CreateCommentRequest) {
    this.comment.create({ data: { bookReviewId, commenterId, content } });
  }

  async update({ id, content }: UpdateCommentRequest) {
    this.comment.update({
      where: { id },
      data: { content },
    });
  }
}

export default CommentService;
