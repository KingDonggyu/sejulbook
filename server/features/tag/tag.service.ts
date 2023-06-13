import { PrismaClient } from '@prisma/client';
import { HttpResponse } from 'server/types/http';
import tagUtils from './tag.util';
import TagDto, { BookReviewId, CreateTagDto, Tag } from './tag.dto';

class TagService {
  private model = new PrismaClient().tag;

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<TagDto[]>> {
    const tags = await this.model.findMany({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: tags.map((e) => tagUtils.entityToDto(e)) };
  }

  async findAllByTagName(tag: Tag): Promise<HttpResponse<TagDto[]>> {
    const tags = await this.model.findMany({
      where: { tag: { search: `${tag}*` } },
      take: 10,
    });
    return { error: false, data: tags.map((e) => tagUtils.entityToDto(e)) };
  }

  async create({
    bookReviewId,
    tag,
  }: CreateTagDto): Promise<HttpResponse<undefined>> {
    await this.model.create({
      data: { sejulbook_id: bookReviewId, tag },
    });
    return { error: false, data: undefined };
  }

  async deleteAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<undefined>> {
    await this.model.deleteMany({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: undefined };
  }
}

export default TagService;
