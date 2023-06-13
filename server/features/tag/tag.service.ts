import { PrismaClient } from '@prisma/client';
import { HttpResponse } from 'server/types/http';
import TagDto, { BookReviewId, CreateTagDto, Tag } from './tag.dto';
import tagUtils from './tag.util';

class TagService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<TagDto[]>> {
    const tags = await this.prisma.tag.findMany({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: tags.map((e) => tagUtils.entityToDto(e)) };
  }

  async findAllByTagName(tag: Tag): Promise<HttpResponse<TagDto[]>> {
    const tags = await this.prisma.tag.findMany({
      where: { tag },
    });
    return { error: false, data: tags.map((e) => tagUtils.entityToDto(e)) };
  }

  async create({
    bookReviewId,
    tag,
  }: CreateTagDto): Promise<HttpResponse<undefined>> {
    await this.prisma.tag.create({
      data: { sejulbook_id: bookReviewId, tag },
    });
    return { error: false, data: undefined };
  }

  async deleteAllByBookReview(
    bookReviewId: BookReviewId,
  ): Promise<HttpResponse<undefined>> {
    await this.prisma.tag.deleteMany({
      where: { sejulbook_id: bookReviewId },
    });
    return { error: false, data: undefined };
  }
}

export default TagService;
