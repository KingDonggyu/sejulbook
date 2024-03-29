import { PrismaClient } from '@prisma/client';
import type {
  Tag,
  BookReviewId,
  CreateTagReqeust,
  GetTagResponse,
  SearchTagResponse,
} from 'tag';

class TagService {
  private tagRepository = new PrismaClient().tag;

  async findAllBookReviewIdByTagName(tag: Tag) {
    return this.tagRepository.findMany({
      select: { bookReviewId: true },
      where: { tag },
    });
  }

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<GetTagResponse[]> {
    return this.tagRepository.findMany({ where: { bookReviewId } });
  }

  async findAllByTagName(tagName: Tag): Promise<SearchTagResponse[]> {
    const result = await this.tagRepository.groupBy({
      by: ['tag'],
      _count: { tag: true },
      where: { tag: { search: `${tagName}*` } },
      orderBy: { _count: { tag: 'desc' } },
      take: 10,
    });

    return result.map(({ _count, tag }) => ({ tag, count: _count.tag }));
  }

  async create({ bookReviewId, tags }: CreateTagReqeust) {
    await tags.reduce(async (previousPromise, tag) => {
      await previousPromise;
      await this.tagRepository.create({ data: { bookReviewId, tag } });
    }, Promise.resolve());
  }

  async deleteAllByBookReview(bookReviewId: BookReviewId) {
    await this.tagRepository.deleteMany({ where: { bookReviewId } });
  }
}

export default TagService;
