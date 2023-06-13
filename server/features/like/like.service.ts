import { PrismaClient } from '@prisma/client';
import { HttpResponse } from 'server/types/http';
import LikeDto, { BookReviewId, LikerId } from './like.dto';

class LikeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async has({
    bookReviewId,
    likerId,
  }: LikeDto): Promise<HttpResponse<boolean>> {
    const like = await this.prisma.likes.findFirst({
      where: { sejulbook_id: bookReviewId, liker_id: likerId },
    });
    return { error: false, data: !!like };
  }

  async countByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<number>> {
    const count = await this.prisma.likes.count({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: count };
  }

  async deleteAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<undefined>> {
    await this.prisma.likes.deleteMany({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: undefined };
  }

  async deleteAllByUser(likerId: LikerId) {
    await this.prisma.likes.deleteMany({
      where: { liker_id: likerId },
    });
    return { error: false, data: undefined };
  }

  async delete({
    bookReviewId,
    likerId,
  }: LikeDto): Promise<HttpResponse<undefined>> {
    await this.prisma.likes.deleteMany({
      where: { sejulbook_id: bookReviewId, liker_id: likerId },
    });
    return { error: false, data: undefined };
  }

  async create({
    bookReviewId,
    likerId,
  }: LikeDto): Promise<HttpResponse<undefined>> {
    await this.prisma.likes.create({
      data: { sejulbook_id: bookReviewId, liker_id: likerId },
    });
    return { error: false, data: undefined };
  }
}

export default LikeService;
