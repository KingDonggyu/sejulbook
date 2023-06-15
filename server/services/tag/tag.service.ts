import { PrismaClient } from '@prisma/client';
import { BookReviewId, Tag } from './dto';
import { CreateTagReqeustDTO } from './dto/create-tag.dto';
import { FindTagResponseDTO } from './dto/find-tag.dto';

class TagService {
  private tag = new PrismaClient().tag;

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<FindTagResponseDTO[]> {
    const tags = await this.tag.findMany({
      where: { sejulbook_id: bookReviewId },
    });

    return tags.map(({ id, tag, sejulbook_id }) => ({
      id,
      tag,
      bookReviewId: sejulbook_id,
    }));
  }

  async findAllByTagName(tag: Tag): Promise<FindTagResponseDTO[]> {
    const tags = await this.tag.findMany({
      where: { tag: { search: `${tag}*` } },
      take: 10,
    });

    return tags.map((entity) => ({
      id: entity.id,
      tag: entity.tag,
      bookReviewId: entity.sejulbook_id,
    }));
  }

  async create({ bookReviewId, tag }: CreateTagReqeustDTO) {
    await this.tag.create({
      data: { sejulbook_id: bookReviewId, tag },
    });
  }

  async deleteAllByBookReview(bookReviewId: BookReviewId) {
    await this.tag.deleteMany({
      where: { sejulbook_id: bookReviewId },
    });
  }
}

export default TagService;
