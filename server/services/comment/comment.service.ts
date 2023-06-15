import { PrismaClient } from '@prisma/client';
import { BookReviewId, CommenterId, Id } from './dto';
import { CreateCommentRequestDTO } from './dto/create-comment.dto';
import { UpdateCommentRequestDTO } from './dto/update-comment.dto';
import FindCommentResponseDTO from './dto/find-comment.dto';

class CommentService {
  private comment = new PrismaClient().reply;

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<FindCommentResponseDTO[]> {
    const comments = await this.comment.findMany({
      where: { sejulbook_id: bookReviewId },
    });

    return comments.map((entity) => ({
      id: entity.id,
      bookReviewId: entity.sejulbook_id,
      commenterId: entity.replyer_id,
      content: entity.reply,
      createdAt: entity.replydate,
    }));
  }

  async countByBookReview(bookReviewId: BookReviewId): Promise<number> {
    return this.comment.count({
      where: { sejulbook_id: bookReviewId },
    });
  }

  async deleteAllByBookreview(bookReviewId: BookReviewId) {
    this.comment.deleteMany({
      where: { sejulbook_id: bookReviewId },
    });
  }

  async deleteAllByUser(commenterId: CommenterId) {
    this.comment.deleteMany({
      where: { replyer_id: commenterId },
    });
  }

  async delete(id: Id) {
    this.comment.delete({ where: { id } });
  }

  async create({
    bookReviewId,
    commenterId,
    content,
  }: CreateCommentRequestDTO) {
    this.comment.create({
      data: {
        sejulbook_id: bookReviewId,
        replyer_id: commenterId,
        reply: content,
      },
    });
  }

  async update({ id, content }: UpdateCommentRequestDTO) {
    this.comment.update({
      where: { id },
      data: { reply: content },
    });
  }
}

export default CommentService;
