import { PrismaClient } from '@prisma/client';
import { HttpResponse } from 'server/types/http';
import CommentDto, {
  Id,
  BookReviewId,
  CommenterId,
  CreateCommnetDto,
  UpdateCommentDto,
} from './comment.dto';
import commentUtils from './comment.util';

class CommentService {
  private comment = new PrismaClient().reply;

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<CommentDto[]>> {
    const comments = await this.comment.findMany({
      where: { sejulbook_id: bookReviewId },
    });
    return {
      error: false,
      data: comments.map((e) => commentUtils.entityToDto(e)),
    };
  }

  async countByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<number>> {
    const count = await this.comment.count({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: count };
  }

  async deleteAllByBookreview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<undefined>> {
    await this.comment.deleteMany({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: undefined };
  }

  async deleteAllByUser(
    commenterId: CommenterId,
  ): Promise<HttpResponse<undefined>> {
    await this.comment.deleteMany({
      where: { replyer_id: commenterId },
    });
    return { error: false, data: undefined };
  }

  async delete(id: Id): Promise<HttpResponse<undefined>> {
    await this.comment.delete({ where: { id } });
    return { error: false, data: undefined };
  }

  async create({
    bookReviewId,
    commenterId,
    content,
  }: CreateCommnetDto): Promise<HttpResponse<CommentDto>> {
    const comment = await this.comment.create({
      data: {
        sejulbook_id: bookReviewId,
        replyer_id: commenterId,
        reply: content,
      },
    });
    return { error: false, data: commentUtils.entityToDto(comment) };
  }

  async update({
    id,
    content,
  }: UpdateCommentDto): Promise<HttpResponse<CommentDto>> {
    const comment = await this.comment.update({
      where: { id },
      data: { reply: content },
    });
    return { error: false, data: commentUtils.entityToDto(comment) };
  }
}

export default CommentService;
