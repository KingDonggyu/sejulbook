import { PrismaClient } from '@prisma/client';
import { BadRequestException, NotFoundException } from 'server/exceptions';
import {
  PagedBookReivewEntity,
  HomeBookReviewEntity,
} from './bookReview.entity';

import { Id, UserId } from './dto';
import {
  FindDraftSavedBookReviewResponseDTO,
  FindHomeBookReviewResponseDTO,
  FindLibraryBookReviewResponseDTO,
  FindPublishedBookReviewResponseDTO,
} from './dto/find-bookReview.dto';
import {
  FindPagedBookReviewByBooknameRequestDTO,
  FindPagedBookReviewByCategoryRequestDTO,
  FindPagedBookReviewByFollowingRequestDTO,
  FindPagedBookReviewByTagRequestDTO,
  FindPagedBookReviewResponseDTO,
} from './dto/find-paged-bookReview.dto';

import LikeService from '../like/like.service';
import UserService from '../user/user.service';
import FollowService from '../follow/follow.service';
import CategoryService from '../category/category.service';
import TagService from '../tag/tag.service';
import CommentService from '../comment/comment.service';
import {
  CreateDraftSavedBookReviewRequestDTO,
  CreatePublishedBookReviewRequestDTO,
} from './dto/create-bookReview.dto';
import {
  UpdateDraftSavedBookReviewReqeustDTO,
  UpdatePublishedBookReviewRequestDTO,
} from './dto/update-bookReview.dto';

class BookReviewService {
  private bookReview = new PrismaClient().sejulbook;

  private userService = new UserService();

  private PUBLISHED = 1;

  private DRAFTSAVED = 0;

  async createDraftSaved(bookReview: CreateDraftSavedBookReviewRequestDTO) {
    this.validate(bookReview, true);
    await this.bookReview.create({
      data: {
        ...bookReview,
        user_id: bookReview.userId,
        writer: bookReview.authors,
        grade: bookReview.rating,
        origin_thumbnail: bookReview.originThumbnail,
        thumbnail: bookReview.thumbnail || '',
        category_id: bookReview.categoryId || 1,
        divide: this.DRAFTSAVED,
      },
    });
  }

  async updateDraftSaved(
    id: Id,
    bookReview: UpdateDraftSavedBookReviewReqeustDTO,
  ) {
    this.validate(bookReview, true);
    await this.bookReview.update({
      where: { id },
      data: {
        ...bookReview,
        grade: bookReview.rating,
        thumbnail: bookReview.thumbnail || '',
        category_id: bookReview.categoryId || 1,
        divide: this.DRAFTSAVED,
      },
    });
  }

  async createPublished(bookReview: CreatePublishedBookReviewRequestDTO) {
    this.validate(bookReview);

    const create = this.bookReview.create({
      data: {
        bookname: bookReview.bookname,
        publisher: bookReview.publisher,
        publication: bookReview.publication,
        sejul: bookReview.sejul,
        user_id: bookReview.userId,
        writer: bookReview.authors,
        grade: bookReview.rating,
        thumbnail: bookReview.thumbnail,
        category_id: bookReview.categoryId,
        sejulplus: bookReview.content,
        origin_thumbnail: bookReview.originThumbnail,
        divide: this.PUBLISHED,
      },
    });

    const promises: Promise<unknown>[] = [create];

    // 임시저장 독후감이 있을 경우 제거
    if (bookReview.id) {
      promises.push(this.delete(bookReview.id));
    }

    await Promise.all(promises);
  }

  async updatePublished(
    id: Id,
    bookReview: UpdatePublishedBookReviewRequestDTO,
  ) {
    this.validate(bookReview);
    await this.bookReview.update({
      where: { id },
      data: {
        ...bookReview,
        grade: bookReview.rating,
        thumbnail: bookReview.thumbnail,
        category_id: bookReview.categoryId,
        sejulplus: bookReview.content,
      },
    });
  }

  async delete(id: Id) {
    await Promise.all([
      new CommentService().deleteAllByBookreview(id),
      new TagService().deleteAllByBookReview(id),
      new LikeService().deleteAllByBookReview(id),
      this.bookReview.delete({ where: { id } }),
    ]);
  }

  async findAllPublishedId(): Promise<Id[]> {
    const result = await this.bookReview.findMany({
      select: { id: true },
      where: { divide: this.PUBLISHED },
    });

    return result.map(({ id }) => id);
  }

  async findAllIdByUser(userId: UserId): Promise<Id[]> {
    const result = await this.bookReview.findMany({
      where: { user_id: userId },
    });

    return result.map(({ id }) => id);
  }

  async findAllDraftSavedByUser(
    userId: UserId,
  ): Promise<FindDraftSavedBookReviewResponseDTO[]> {
    const bookReviews = await this.bookReview.findMany({
      select: { id: true, bookname: true, datecreated: true },
      where: { user_id: userId, divide: this.DRAFTSAVED },
    });

    return bookReviews.map(({ id, bookname, datecreated }) => ({
      id,
      bookname,
      createdAt: datecreated,
    }));
  }

  async findPublished(id: Id): Promise<FindPublishedBookReviewResponseDTO> {
    const bookReview = await this.bookReview.findUnique({
      where: { id },
    });

    if (!bookReview) {
      throw new NotFoundException('존재하지 않는 독후감입니다.');
    }

    const [{ name }, { category }] = await Promise.all([
      this.userService.findNameById(bookReview.user_id),
      new CategoryService().findById(bookReview.category_id),
    ]);

    return {
      id: bookReview.id,
      bookname: bookReview.bookname,
      authors: bookReview.writer,
      publication: bookReview.publication,
      publisher: bookReview.publisher,
      thumbnail: bookReview.thumbnail,
      rating: bookReview.grade,
      sejul: bookReview.sejul,
      content: bookReview.sejulplus,
      isDraftSave: false,
      originThumbnail: bookReview.origin_thumbnail || undefined,
      createdAt: bookReview.datecreated,
      writer: name,
      category,
    };
  }

  // 방문 서재 독후감
  async findAllByUser(
    userId: UserId,
  ): Promise<FindLibraryBookReviewResponseDTO[]> {
    const bookReviews = await this.bookReview.findMany({
      select: {
        id: true,
        bookname: true,
        sejul: true,
        thumbnail: true,
        datecreated: true,
      },
      where: { user_id: userId, divide: this.PUBLISHED },
    });

    const likeService = new LikeService();
    const commentService = new CommentService();

    const promises = bookReviews.map(async (bookReview) => {
      const [likeCount, commentCount] = await Promise.all([
        likeService.countByBookReview(bookReview.id),
        commentService.countByBookReview(bookReview.id),
      ]);

      return {
        id: bookReview.id,
        bookname: bookReview.bookname,
        sejul: bookReview.sejul,
        thumbnail: bookReview.thumbnail,
        createdAt: bookReview.datecreated,
        likeCount,
        commentCount,
      };
    });

    return Promise.all(promises);
  }

  // 좋아요 순의 10개 독후감
  async findTenMostLike(): Promise<FindHomeBookReviewResponseDTO[]> {
    const ids = await new LikeService().findTenMostBookReviewId();
    const promises = ids.map(async (id) => {
      const bookReview = await this.bookReview.findUnique({
        select: {
          id: true,
          bookname: true,
          sejul: true,
          thumbnail: true,
          user_id: true,
          datecreated: true,
        },
        where: { id },
      });

      if (!bookReview) {
        throw new NotFoundException(`${id} 독후감을 찾을 수 없습니다.`);
      }

      const { name } = await this.userService.findNameById(bookReview.user_id);

      return {
        id: bookReview.id,
        bookname: bookReview.bookname,
        thumbnail: bookReview.thumbnail,
        sejul: bookReview.sejul,
        createdAt: bookReview.datecreated,
        writer: name,
      };
    });

    return Promise.all(promises);
  }

  // 최신 순의 10개 독후감
  async findTenLatest(): Promise<FindHomeBookReviewResponseDTO[]> {
    const bookReviews = await this.bookReview.findMany({
      select: {
        id: true,
        bookname: true,
        sejul: true,
        thumbnail: true,
        user_id: true,
        datecreated: true,
      },
      where: { divide: this.PUBLISHED },
      orderBy: { id: 'desc' },
      take: 10,
    });

    return this.addWritersToBookReviewSummarys(bookReviews);
  }

  // 최신 순의 10개 구독 독후감
  async findTenFollowing(
    userId: UserId,
  ): Promise<FindHomeBookReviewResponseDTO[]> {
    const followingIds = await new FollowService().findAllFollowing(userId);
    const bookReviews = await this.bookReview.findMany({
      select: {
        id: true,
        bookname: true,
        sejul: true,
        thumbnail: true,
        user_id: true,
        datecreated: true,
      },
      where: {
        user_id: { in: followingIds },
        divide: this.PUBLISHED,
      },
      orderBy: { id: 'desc' },
      take: 10,
    });

    return this.addWritersToBookReviewSummarys(bookReviews);
  }

  // 책이름으로 독후감 검색 - pagination
  async findPagesByBookname({
    bookname,
    targetId,
  }: FindPagedBookReviewByBooknameRequestDTO): Promise<
    FindPagedBookReviewResponseDTO[]
  > {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const bookReviews = await this.bookReview.findMany({
      select: { id: true, thumbnail: true, user_id: true, sejul: true },
      where: { bookname, divide: this.PUBLISHED },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addWritersToBookReviewPages(bookReviews);
  }

  // 카테고리로 독후감 검색 - pagination
  async findPagesByCategory({
    category,
    targetId,
  }: FindPagedBookReviewByCategoryRequestDTO): Promise<
    FindPagedBookReviewResponseDTO[]
  > {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const { id: categoryId } = await new CategoryService().findId(category);
    const bookReviews = await this.bookReview.findMany({
      select: { id: true, thumbnail: true, user_id: true, sejul: true },
      where: { category_id: categoryId, divide: this.PUBLISHED },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addWritersToBookReviewPages(bookReviews);
  }

  // 태그로 독후감 검색 - pagination
  async findPagesByTag({
    tag,
    targetId,
  }: FindPagedBookReviewByTagRequestDTO): Promise<
    FindPagedBookReviewResponseDTO[]
  > {
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
      select: { id: true, thumbnail: true, user_id: true, sejul: true },
      where: { id: { in: bookReivewIds }, divide: this.PUBLISHED },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addWritersToBookReviewPages(bookReviews);
  }

  // 관심 서재 독후감 - pagination
  async findFollowingPages({
    followerId,
    targetId,
  }: FindPagedBookReviewByFollowingRequestDTO): Promise<
    FindPagedBookReviewResponseDTO[]
  > {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const followingIds = await new FollowService().findAllFollowing(followerId);
    const bookReviews = await this.bookReview.findMany({
      select: { id: true, thumbnail: true, user_id: true, sejul: true },
      where: {
        user_id: { in: followingIds },
        divide: this.PUBLISHED,
      },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addWritersToBookReviewPages(bookReviews);
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

  private async addWritersToBookReviewSummarys(
    bookReviews: HomeBookReviewEntity[],
  ) {
    const promises = bookReviews.map(async (bookReview) => {
      const { name } = await this.userService.findNameById(bookReview.user_id);

      return {
        id: bookReview.id,
        bookname: bookReview.bookname,
        thumbnail: bookReview.thumbnail,
        sejul: bookReview.sejul,
        createdAt: bookReview.datecreated,
        writer: name,
      };
    });

    return Promise.all(promises);
  }

  private async addWritersToBookReviewPages(
    bookReviews: PagedBookReivewEntity[],
  ) {
    const promises = bookReviews.map(
      async ({ id, thumbnail, sejul, user_id }) => {
        const { name } = await this.userService.findNameById(user_id);

        return {
          id,
          thumbnail,
          sejul,
          writer: name,
          userId: user_id,
        };
      },
    );

    return Promise.all(promises);
  }

  // eslint-disable-next-line class-methods-use-this
  private validate(
    bookReview:
      | CreateDraftSavedBookReviewRequestDTO
      | CreatePublishedBookReviewRequestDTO
      | UpdateDraftSavedBookReviewReqeustDTO
      | UpdatePublishedBookReviewRequestDTO,
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
