import { PrismaClient } from '@prisma/client';
import { HttpResponse } from 'server/types/http';
import LikeDto, { BookReviewId, LikerId } from './like.dto';

class LikeService {
  private model = new PrismaClient().likes;

  async has({
    bookReviewId,
    likerId,
  }: LikeDto): Promise<HttpResponse<boolean>> {
    const like = await this.model.findFirst({
      where: { sejulbook_id: bookReviewId, liker_id: likerId },
    });
    return { error: false, data: !!like };
  }

  async countByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<number>> {
    const count = await this.model.count({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: count };
  }

  async deleteAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<undefined>> {
    await this.model.deleteMany({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: undefined };
  }

  async deleteAllByUser(likerId: LikerId) {
    await this.model.deleteMany({
      where: { liker_id: likerId },
    });
    return { error: false, data: undefined };
  }

  async delete({
    bookReviewId,
    likerId,
  }: LikeDto): Promise<HttpResponse<undefined>> {
    await this.model.deleteMany({
      where: { sejulbook_id: bookReviewId, liker_id: likerId },
    });
    return { error: false, data: undefined };
  }

  async create({
    bookReviewId,
    likerId,
  }: LikeDto): Promise<HttpResponse<undefined>> {
    await this.model.create({
      data: { sejulbook_id: bookReviewId, liker_id: likerId },
    });
    return { error: false, data: undefined };
  }
}

export default LikeService;
