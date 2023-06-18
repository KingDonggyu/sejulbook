import { PrismaClient } from '@prisma/client';
import { BookReviewId, CommenterId, Id, Content } from './dto';
import { CreateRequestDTO } from './dto/create-comment.dto';
import { UpdateCommentRequestDTO } from './dto/update-comment.dto';
import { FindCommentResponseDTO } from './dto/find-comment.dto';

class CommentService {
  private comment = new PrismaClient().comment;

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<FindCommentResponseDTO[]> {
    return this.comment.findMany({ where: { bookReviewId } });
  }

  async countByBookReview(bookReviewId: BookReviewId): Promise<number> {
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

  async create({ bookReviewId, commenterId, content }: CreateRequestDTO) {
    this.comment.create({ data: { bookReviewId, commenterId, content } });
  }

  async update({ id, content }: UpdateCommentRequestDTO) {
    this.comment.update({
      where: { id },
      data: { content },
    });
  }
}

export default CommentService;

export type {
  Id,
  BookReviewId,
  CommenterId,
  Content,
  CreateRequestDTO,
  UpdateCommentRequestDTO,
  FindCommentResponseDTO,
};
