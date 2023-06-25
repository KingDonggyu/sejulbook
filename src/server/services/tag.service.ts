import { PrismaClient } from '@prisma/client';
import type { Tag, BookReviewId, CreateTagReqeust, GetTagResponse } from 'tag';

class TagService {
  private tag = new PrismaClient().tag;

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<GetTagResponse[]> {
    return this.tag.findMany({ where: { bookReviewId } });
  }

  async findAllByTagName(tag: Tag): Promise<GetTagResponse[]> {
    return this.tag.findMany({
      where: { tag: { search: `${tag}*` } },
      take: 10,
    });
  }

  async create({ bookReviewId, tags }: CreateTagReqeust) {
    const promises = tags.map(async (tag) =>
      this.tag.create({ data: { bookReviewId, tag } }),
    );

    await Promise.all(promises);
  }

  async deleteAllByBookReview(bookReviewId: BookReviewId) {
    await this.tag.deleteMany({ where: { bookReviewId } });
  }
}

export default TagService;
