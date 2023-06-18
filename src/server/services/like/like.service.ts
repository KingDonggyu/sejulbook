import { PrismaClient } from '@prisma/client';
import { BookReviewId, LikeDefaultRequestDTO, LikerId } from './dto';

class LikeService {
  private like = new PrismaClient().like;

  async has({ bookReviewId, likerId }: LikeDefaultRequestDTO) {
    const like = await this.like.findFirst({
      where: { bookReviewId, likerId },
    });

    return !!like;
  }

  async findTenMostBookReviewId(): Promise<BookReviewId[]> {
    const result = await this.like.groupBy({
      by: ['bookReviewId'],
      _count: { bookReviewId: true },
      orderBy: [{ _count: { bookReviewId: 'desc' } }, { bookReviewId: 'desc' }],
      take: 10,
    });

    return result.map(({ bookReviewId }) => bookReviewId);
  }

  async countByBookReview(bookReviewId: BookReviewId) {
    return this.like.count({ where: { bookReviewId } });
  }

  async deleteAllByBookReview(bookReviewId: BookReviewId) {
    await this.like.deleteMany({ where: { bookReviewId } });
  }

  async deleteAllByUser(likerId: LikerId) {
    await this.like.deleteMany({ where: { likerId } });
  }

  async delete({ bookReviewId, likerId }: LikeDefaultRequestDTO) {
    await this.like.deleteMany({ where: { bookReviewId, likerId } });
  }

  async create({ bookReviewId, likerId }: LikeDefaultRequestDTO) {
    await this.like.create({ data: { bookReviewId, likerId } });
  }
}

export default LikeService;

export type { LikeDefaultRequestDTO };
