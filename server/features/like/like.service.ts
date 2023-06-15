import { PrismaClient } from '@prisma/client';
import { BookReviewId, LikeDefaultRequestDTO, LikerId } from './dto';

class LikeService {
  private like = new PrismaClient().likes;

  async has({ bookReviewId, likerId }: LikeDefaultRequestDTO) {
    const like = await this.like.findFirst({
      where: { sejulbook_id: bookReviewId, liker_id: likerId },
    });
    return !!like;
  }

  async findTenMostBookReviewId(): Promise<BookReviewId[]> {
    const result = await this.like.groupBy({
      by: ['sejulbook_id'],
      _count: { sejulbook_id: true },
      orderBy: [{ _count: { sejulbook_id: 'desc' } }, { sejulbook_id: 'desc' }],
      take: 10,
    });
    return result.map(({ sejulbook_id }) => sejulbook_id);
  }

  async countByBookReview(bookReviewId: BookReviewId) {
    return this.like.count({
      where: { sejulbook_id: bookReviewId },
    });
  }

  async deleteAllByBookReview(bookReviewId: BookReviewId) {
    await this.like.deleteMany({
      where: { sejulbook_id: bookReviewId },
    });
  }

  async deleteAllByUser(likerId: LikerId) {
    await this.like.deleteMany({
      where: { liker_id: likerId },
    });
  }

  async delete({ bookReviewId, likerId }: LikeDefaultRequestDTO) {
    await this.like.deleteMany({
      where: { sejulbook_id: bookReviewId, liker_id: likerId },
    });
  }

  async create({ bookReviewId, likerId }: LikeDefaultRequestDTO) {
    await this.like.create({
      data: { sejulbook_id: bookReviewId, liker_id: likerId },
    });
  }
}

export default LikeService;
