import { PrismaClient } from '@prisma/client';
import { BookReviewId, Tag } from './dto';
import { CreateTagReqeustDTO } from './dto/create-tag.dto';
import { FindTagResponseDTO } from './dto/find-tag.dto';

class TagService {
  private tag = new PrismaClient().tag;

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<FindTagResponseDTO[]> {
    return this.tag.findMany({ where: { bookReviewId } });
  }

  async findAllByTagName(tag: Tag): Promise<FindTagResponseDTO[]> {
    return this.tag.findMany({
      where: { tag: { search: `${tag}*` } },
      take: 10,
    });
  }

  async create({ bookReviewId, tags }: CreateTagReqeustDTO) {
    const promises = tags.map(async (tag) => {
      this.tag.create({ data: { bookReviewId, tag } });
    });

    await Promise.all(promises);
  }

  async deleteAllByBookReview(bookReviewId: BookReviewId) {
    await this.tag.deleteMany({ where: { bookReviewId } });
  }
}

export default TagService;

export type { BookReviewId };
