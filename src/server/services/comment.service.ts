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
  private commentRepository = new PrismaClient().comment;

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<GetCommentResponse[]> {
    const comments = await this.commentRepository.findMany({
      where: { bookReviewId },
    });
    return comments.map(({ createdAt, ...others }) => ({
      ...others,
      createdAt: createdAt.toString(),
    }));
  }

  async countByBookReview(bookReviewId: BookReviewId) {
    return this.commentRepository.count({ where: { bookReviewId } });
  }

  async deleteAllByBookreview(bookReviewId: BookReviewId) {
    await this.commentRepository.deleteMany({ where: { bookReviewId } });
  }

  async deleteAllByUser(commenterId: CommenterId) {
    await this.commentRepository.deleteMany({ where: { commenterId } });
  }

  async delete(id: Id) {
    await this.commentRepository.delete({ where: { id } });
  }

  async create({ bookReviewId, commenterId, content }: CreateCommentRequest) {
    await this.commentRepository.create({
      data: { bookReviewId, commenterId, content },
    });
  }

  async update({ id, content }: UpdateCommentRequest) {
    await this.commentRepository.update({
      where: { id },
      data: { content },
    });
  }
}

export default CommentService;
