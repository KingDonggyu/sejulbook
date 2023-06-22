import { PrismaClient } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@/server/exceptions';

import { Id, UserId } from './dto';
import {
  FindDraftSavedResponseDTO,
  FindHomeResponseDTO,
  FindLibraryResponseDTO,
  FindResponseDTO,
} from './dto/find-bookReview.dto';
import {
  FindPagesByBooknameRequestDTO,
  FindPagesByCategoryRequestDTO,
  FindPagesByFollowingRequestDTO,
  FindPagesByTagRequestDTO,
  FindPagesResponseDTO,
} from './dto/find-paged-bookReview.dto';
import {
  CreateDraftSaveRequestDTO,
  CreatePublishRequestDTO,
} from './dto/create-bookReview.dto';
import {
  UpdateDraftSavedReqeustDTO,
  UpdatePublishedRequestDTO,
} from './dto/update-bookReview.dto';

import LikeService from '../like/like.service';
import UserService from '../user/user.service';
import FollowService from '../follow/follow.service';
import CategoryService from '../category/category.service';
import TagService from '../tag/tag.service';
import CommentService from '../comment/comment.service';

class BookReviewService {
  private bookReview = new PrismaClient().bookReview;

  private userService = new UserService();

  private type = { published: 1, draftSaved: 0 };

  async createDraftSaved(bookReview: CreateDraftSaveRequestDTO) {
    this.validate(bookReview, true);

    const count = await this.bookReview.count({
      where: { id: bookReview.userId, type: this.type.draftSaved },
    });

    if (count === 10) {
      throw new BadRequestException(
        '최대 10개의 독후감만 임시저장할 수 있습니다.',
      );
    }

    const { id: bookReviewId } = await this.bookReview.create({
      data: {
        ...bookReview,
        thumbnail: bookReview.thumbnail || '',
        categoryId: bookReview.categoryId || 1,
        type: this.type.draftSaved,
      },
    });

    await new TagService().create({ bookReviewId, tags: bookReview.tags });
    return bookReviewId;
  }

  async updateDraftSaved(id: Id, bookReview: UpdateDraftSavedReqeustDTO) {
    this.validate(bookReview, true);

    const tagService = new TagService();

    const promises = [
      this.bookReview.update({
        where: { id },
        data: {
          ...bookReview,
          thumbnail: bookReview.thumbnail || '',
          categoryId: bookReview.categoryId || 1,
          type: this.type.draftSaved,
        },
      }),
      tagService.create({ bookReviewId: id, tags: bookReview.tags }),
      tagService.deleteAllByBookReview(id),
    ];

    await Promise.all(promises);
  }

  async createPublished(bookReview: CreatePublishRequestDTO) {
    this.validate(bookReview);

    const [{ id: bookReviewId }] = await Promise.all([
      this.bookReview.create({
        data: { ...bookReview, id: undefined, type: this.type.published },
      }),
      bookReview.id && this.delete(bookReview.id),
    ]);

    await new TagService().create({ bookReviewId, tags: bookReview.tags });
    return bookReviewId;
  }

  async updatePublished(id: Id, bookReview: UpdatePublishedRequestDTO) {
    this.validate(bookReview);
    const tagService = new TagService();
    const promises = [
      this.bookReview.update({
        where: { id },
        data: bookReview,
      }),
      tagService.create({ bookReviewId: id, tags: bookReview.tags }),
      tagService.deleteAllByBookReview(id),
    ];

    await Promise.all(promises);
  }

  async delete(id: Id) {
    await Promise.all([
      new CommentService().deleteAllByBookreview(id),
      new TagService().deleteAllByBookReview(id),
      new LikeService().deleteAllByBookReview(id),
      this.bookReview.delete({ where: { id } }),
    ]);
  }

  async findAllId() {
    return this.bookReview.findMany({ select: { id: true } });
  }

  async findAllPublishedId(): Promise<Id[]> {
    const result = await this.bookReview.findMany({
      select: { id: true },
      where: { type: this.type.published },
    });

    return result.map(({ id }) => id);
  }

  async findAllIdByUser(userId: UserId): Promise<Id[]> {
    const result = await this.bookReview.findMany({
      select: { id: true },
      where: { userId },
    });

    return result.map(({ id }) => id);
  }

  async findAllDraftSavedByUser(
    userId: UserId,
  ): Promise<FindDraftSavedResponseDTO[]> {
    return this.bookReview.findMany({
      select: { id: true, bookname: true, createdAt: true },
      where: { userId, type: this.type.draftSaved },
    });
  }

  async find(id: Id): Promise<FindResponseDTO> {
    const bookReview = await this.bookReview.findUnique({
      where: { id },
    });

    if (!bookReview) {
      throw new NotFoundException('존재하지 않는 독후감입니다.');
    }

    const [{ name: writer }, { category }] = await Promise.all([
      this.userService.findNameById(bookReview.userId),
      new CategoryService().findById(bookReview.userId),
    ]);

    return {
      ...bookReview,
      writer,
      category,
      publication: bookReview.publication.toString(),
      createdAt: bookReview.createdAt.toString(),
      originThumbnail: bookReview.originThumbnail || undefined,
    };
  }

  // 방문 서재 독후감
  async findAllByUser(userId: UserId): Promise<FindLibraryResponseDTO[]> {
    const bookReviews = await this.bookReview.findMany({
      select: {
        id: true,
        bookname: true,
        sejul: true,
        thumbnail: true,
        createdAt: true,
      },
      where: { userId, type: this.type.published },
    });

    const likeService = new LikeService();
    const commentService = new CommentService();

    const promises = bookReviews.map(async (bookReview) => {
      const [likeCount, commentCount] = await Promise.all([
        likeService.countByBookReview(bookReview.id),
        commentService.countByBookReview(bookReview.id),
      ]);

      return {
        ...bookReview,
        likeCount,
        commentCount,
        createdAt: bookReview.createdAt.toString(),
      };
    });

    return Promise.all(promises);
  }

  // 좋아요 순의 10개 독후감
  async findTenMostLike(): Promise<FindHomeResponseDTO[]> {
    const ids = await new LikeService().findTenMostBookReviewId();
    const promises = ids.map(async (id) => {
      const bookReview = await this.bookReview.findUnique({
        select: {
          id: true,
          bookname: true,
          sejul: true,
          thumbnail: true,
          userId: true,
          createdAt: true,
        },
        where: { id },
      });

      if (!bookReview) {
        throw new NotFoundException(`${id} 독후감을 찾을 수 없습니다.`);
      }

      const { name: writer } = await this.userService.findNameById(
        bookReview.userId,
      );

      return {
        ...bookReview,
        writer,
        createdAt: bookReview.createdAt.toString(),
      };
    });

    return Promise.all(promises);
  }

  // 최신 순의 10개 독후감
  async findTenLatest(): Promise<FindHomeResponseDTO[]> {
    const bookReviews = await this.bookReview.findMany({
      select: {
        id: true,
        bookname: true,
        sejul: true,
        thumbnail: true,
        userId: true,
        createdAt: true,
      },
      where: { type: this.type.published },
      orderBy: { id: 'desc' },
      take: 10,
    });

    return this.addWritersToHomeBookReviews(bookReviews);
  }

  // 최신 순의 10개 구독 독후감
  async findTenFollowing(userId: UserId): Promise<FindHomeResponseDTO[]> {
    const followingIds = await new FollowService().findAllFollowing(userId);
    const bookReviews = await this.bookReview.findMany({
      select: {
        id: true,
        bookname: true,
        sejul: true,
        thumbnail: true,
        userId: true,
        createdAt: true,
      },
      where: {
        userId: { in: followingIds },
        type: this.type.published,
      },
      orderBy: { id: 'desc' },
      take: 10,
    });

    return this.addWritersToHomeBookReviews(bookReviews);
  }

  // 책이름으로 독후감 검색 - pagination
  async findPagesByBookname({
    bookname,
    targetId,
  }: FindPagesByBooknameRequestDTO): Promise<FindPagesResponseDTO[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const bookReviews = await this.bookReview.findMany({
      select: { id: true, thumbnail: true, userId: true, sejul: true },
      where: { bookname, type: this.type.published },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addWritersToPagedBookReviews(bookReviews);
  }

  // 카테고리로 독후감 검색 - pagination
  async findPagesByCategory({
    category,
    targetId,
  }: FindPagesByCategoryRequestDTO): Promise<FindPagesResponseDTO[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const { id: categoryId } = await new CategoryService().findId(category);
    const bookReviews = await this.bookReview.findMany({
      select: { id: true, thumbnail: true, userId: true, sejul: true },
      where: { categoryId, type: this.type.published },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addWritersToPagedBookReviews(bookReviews);
  }

  // 태그로 독후감 검색 - pagination
  async findPagesByTag({
    tag,
    targetId,
  }: FindPagesByTagRequestDTO): Promise<FindPagesResponseDTO[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const tags = await new TagService().findAllByTagName(tag);
    const bookReivewIds = tags.map(({ bookReviewId }) => bookReviewId);

    const bookReviews = await this.bookReview.findMany({
      select: { id: true, thumbnail: true, userId: true, sejul: true },
      where: { id: { in: bookReivewIds }, type: this.type.published },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addWritersToPagedBookReviews(bookReviews);
  }

  // 관심 서재 독후감 - pagination
  async findFollowingPages({
    followerId,
    targetId,
  }: FindPagesByFollowingRequestDTO): Promise<FindPagesResponseDTO[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const followingIds = await new FollowService().findAllFollowing(followerId);
    const bookReviews = await this.bookReview.findMany({
      select: { id: true, thumbnail: true, userId: true, sejul: true },
      where: {
        userId: { in: followingIds },
        type: this.type.published,
      },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addWritersToPagedBookReviews(bookReviews);
  }

  private async findMaxId(): Promise<Id | null> {
    const result = await this.bookReview.findFirst({
      select: { id: true },
      orderBy: { id: 'desc' },
    });

    if (result) {
      return result.id;
    }

    return null;
  }

  private async addWritersToHomeBookReviews(
    bookReviews: (Omit<FindHomeResponseDTO, 'writer' | 'createdAt'> & {
      createdAt: Date;
    })[],
  ) {
    const promises = bookReviews.map(async (bookReview) => {
      const { name: writer } = await this.userService.findNameById(
        bookReview.userId,
      );

      return {
        ...bookReview,
        writer,
        createdAt: bookReview.createdAt.toString(),
      };
    });

    return Promise.all(promises);
  }

  private async addWritersToPagedBookReviews(
    bookReviews: Omit<FindPagesResponseDTO, 'writer'>[],
  ) {
    const promises = bookReviews.map(async ({ userId, ...bookReview }) => {
      const { name: writer } = await this.userService.findNameById(userId);
      return { ...bookReview, userId, writer };
    });

    return Promise.all(promises);
  }

  // eslint-disable-next-line class-methods-use-this
  private validate(
    bookReview:
      | CreateDraftSaveRequestDTO
      | CreatePublishRequestDTO
      | UpdateDraftSavedReqeustDTO
      | UpdatePublishedRequestDTO,
    isDraftSave = false,
  ) {
    if ('bookname' in bookReview && !bookReview.bookname) {
      throw new BadRequestException('책을 선택해주세요.');
    }

    if (!isDraftSave && !bookReview.sejul) {
      throw new BadRequestException('세 줄 독후감을 작성해주세요.');
    }

    if (bookReview.sejul && bookReview.sejul.length > 200) {
      throw new BadRequestException(
        '세 줄 독후감은 200자 이하만 작성할 수 있습니다.',
      );
    }

    if (!isDraftSave && !bookReview.thumbnail) {
      throw new BadRequestException('책 표지 사진을 설정해주세요.');
    }

    if (!isDraftSave && bookReview.categoryId && bookReview.categoryId < 2) {
      throw new BadRequestException('카테고리를 선택해주세요.');
    }

    if (bookReview.rating < 1 || bookReview.rating > 5) {
      throw new BadRequestException(
        '평점은 1 이상 5 이하만 선택할 수 있습니다.',
      );
    }
  }
}

export default BookReviewService;

export type {
  Id,
  UserId,
  CreatePublishRequestDTO,
  CreateDraftSaveRequestDTO,
  UpdatePublishedRequestDTO,
  UpdateDraftSavedReqeustDTO,
  FindPagesByBooknameRequestDTO,
  FindPagesByCategoryRequestDTO,
  FindPagesByTagRequestDTO,
  FindPagesByFollowingRequestDTO,
};
