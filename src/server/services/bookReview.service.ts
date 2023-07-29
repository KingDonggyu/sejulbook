import { PrismaClient } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@/server/exceptions';

import type {
  Id,
  UserId,
  CreateBookReviewReqeust,
  GetBookReviewPageByBookNameRequest,
  GetBookReviewPageByCategoryRequest,
  GetBookReviewPageByTagRequest,
  GetBookReviewPageResponse,
  GetDraftSavedBookReviewResponse,
  GetFollowingBookReviewPageRequest,
  GetHomeBookReviewResponse,
  GetLibraryBookReviewResponse,
  GetPublishedBookReviewResponse,
  UpdateBookReviewRequest,
  HasBookReviewRequest,
} from 'bookReview';

import type LikeService from './like.service';
import type UserService from './user.service';
import type FollowService from './follow.service';
import type CategoryService from './category.service';
import type TagService from './tag.service';
import type CommentService from './comment.service';

interface Services {
  userService: UserService;
  likeService: LikeService;
  followService: FollowService;
  categoryService: CategoryService;
  tagService: TagService;
  commentService: CommentService;
}

class BookReviewService {
  private bookReviewRepository = new PrismaClient().bookReview;

  private userService: UserService;

  private likeService: LikeService;

  private followService: FollowService;

  private categoryService: CategoryService;

  private tagService: TagService;

  private commentService: CommentService;

  private type = { published: 1, draftSaved: 0 };

  constructor({
    userService,
    likeService,
    followService,
    categoryService,
    tagService,
    commentService,
  }: Services) {
    this.userService = userService;
    this.likeService = likeService;
    this.followService = followService;
    this.categoryService = categoryService;
    this.tagService = tagService;
    this.commentService = commentService;
  }

  async hasBookReview({ userId, id }: HasBookReviewRequest) {
    const bookReview = await this.bookReviewRepository.findUnique({
      where: { id },
    });

    if (!bookReview) {
      throw new NotFoundException('존재하지 않는 독후감입니다.');
    }

    return bookReview.userId === userId;
  }

  async createDraftSaved(bookReview: CreateBookReviewReqeust) {
    this.validate(bookReview, true);

    const count = await this.bookReviewRepository.count({
      where: { id: bookReview.userId, type: this.type.draftSaved },
    });

    if (count === 10) {
      throw new BadRequestException(
        '최대 10개의 독후감만 임시저장할 수 있습니다.',
      );
    }

    const { id: bookReviewId } = await this.bookReviewRepository.create({
      data: {
        userId: bookReview.userId,
        bookname: bookReview.bookname,
        authors: bookReview.authors,
        publisher: bookReview.publisher,
        publication: bookReview.publication,
        originThumbnail: bookReview.originThumbnail,
        thumbnail: bookReview.thumbnail,
        sejul: bookReview.sejul,
        content: bookReview.content,
        rating: bookReview.rating,
        categoryId: bookReview.categoryId,
        type: this.type.draftSaved,
      },
    });

    await this.tagService.create({ bookReviewId, tags: bookReview.tags });
    return bookReviewId;
  }

  async updateDraftSaved(id: Id, bookReview: UpdateBookReviewRequest) {
    this.validate(bookReview, true);

    const promises = [
      this.bookReviewRepository.update({
        where: { id },
        data: {
          rating: bookReview.rating,
          sejul: bookReview.sejul,
          content: bookReview.content,
          thumbnail: bookReview.thumbnail,
          categoryId: bookReview.categoryId,
          type: this.type.draftSaved,
        },
      }),
      this.tagService.deleteAllByBookReview(id),
    ];

    await Promise.all(promises);
    await this.tagService.create({ bookReviewId: id, tags: bookReview.tags });
  }

  async createPublished(bookReview: CreateBookReviewReqeust) {
    this.validate(bookReview);

    const [{ id: bookReviewId }] = await Promise.all([
      this.bookReviewRepository.create({
        data: {
          userId: bookReview.userId,
          bookname: bookReview.bookname,
          authors: bookReview.authors,
          publisher: bookReview.publisher,
          publication: new Date(bookReview.publication),
          originThumbnail: bookReview.originThumbnail,
          thumbnail: bookReview.thumbnail,
          sejul: bookReview.sejul,
          content: bookReview.content,
          rating: bookReview.rating,
          categoryId: bookReview.categoryId,
          type: this.type.published,
        },
      }),
      bookReview.id && this.delete(bookReview.id),
    ]);

    await this.tagService.create({ bookReviewId, tags: bookReview.tags });
    return bookReviewId;
  }

  async updatePublished(id: Id, bookReview: UpdateBookReviewRequest) {
    this.validate(bookReview);

    const promises = [
      this.bookReviewRepository.update({
        where: { id },
        data: {
          sejul: bookReview.sejul,
          content: bookReview.content,
          thumbnail: bookReview.thumbnail,
          categoryId: bookReview.categoryId,
          rating: bookReview.rating,
          type: this.type.published,
        },
      }),
      this.tagService.deleteAllByBookReview(id),
    ];

    await Promise.all(promises);
    await this.tagService.create({ bookReviewId: id, tags: bookReview.tags });
  }

  async delete(id: Id) {
    await Promise.all([
      this.commentService.deleteAllByBookreview(id),
      this.tagService.deleteAllByBookReview(id),
      this.likeService.deleteAllByBookReview(id),
      this.bookReviewRepository.delete({ where: { id } }),
    ]);
  }

  async deleteAllByUser(userId: UserId) {
    const ids = await this.findAllIdByUser(userId);
    await Promise.all(ids.map(async (id) => this.delete(id)));
  }

  async findAllId() {
    return this.bookReviewRepository.findMany({ select: { id: true } });
  }

  async findAllPublishedId(): Promise<Id[]> {
    const result = await this.bookReviewRepository.findMany({
      select: { id: true },
      where: { type: this.type.published },
    });

    return result.map(({ id }) => id);
  }

  async findAllIdByUser(userId: UserId): Promise<Id[]> {
    const result = await this.bookReviewRepository.findMany({
      select: { id: true },
      where: { userId },
    });

    return result.map(({ id }) => id);
  }

  async findAllDraftSavedByUser(
    userId: UserId,
  ): Promise<GetDraftSavedBookReviewResponse[]> {
    const bookReviews = await this.bookReviewRepository.findMany({
      select: { id: true, bookname: true, createdAt: true },
      where: { userId, type: this.type.draftSaved },
    });

    return bookReviews.map(({ createdAt, ...others }) => ({
      ...others,
      createdAt: createdAt.toString(),
    }));
  }

  async find(
    id: Id,
    isOnlyPublished: boolean,
  ): Promise<GetPublishedBookReviewResponse> {
    const bookReview = await this.bookReviewRepository.findUnique({
      where: { id },
    });

    if (!bookReview) {
      throw new NotFoundException('존재하지 않는 독후감입니다.');
    }

    if (isOnlyPublished && bookReview.type === this.type.draftSaved) {
      throw new NotFoundException('존재하지 않는 독후감입니다.');
    }

    const [{ name: writer }, { category }] = await Promise.all([
      this.userService.findNameById(bookReview.userId),
      this.categoryService.findById(bookReview.categoryId),
    ]);

    return {
      ...bookReview,
      writer,
      category,
      categorId: bookReview.categoryId,
      publication: bookReview.publication.toString(),
      createdAt: bookReview.createdAt.toString(),
      originThumbnail: bookReview.originThumbnail || undefined,
    };
  }

  // 방문 서재 독후감
  async findAllByUser(userId: UserId): Promise<GetLibraryBookReviewResponse[]> {
    const bookReviews = await this.bookReviewRepository.findMany({
      select: {
        id: true,
        bookname: true,
        sejul: true,
        thumbnail: true,
        createdAt: true,
      },
      where: { userId, type: this.type.published },
    });

    const promises = bookReviews.map(async (bookReview) => {
      const [likeCount, commentCount] = await Promise.all([
        this.likeService.countByBookReview(bookReview.id),
        this.commentService.countByBookReview(bookReview.id),
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
  async findTenMostLike(): Promise<GetHomeBookReviewResponse[]> {
    const ids = await this.likeService.findTenMostBookReviewId();
    const promises = ids.map(async (id) => {
      const bookReview = await this.bookReviewRepository.findUnique({
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
  async findTenLatest(): Promise<GetHomeBookReviewResponse[]> {
    const bookReviews = await this.bookReviewRepository.findMany({
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
  async findTenFollowing(userId: UserId): Promise<GetHomeBookReviewResponse[]> {
    const followingIds = await this.followService.findAllFollowingId(userId);
    const bookReviews = await this.bookReviewRepository.findMany({
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
  }: GetBookReviewPageByBookNameRequest): Promise<GetBookReviewPageResponse[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const bookReviews = await this.bookReviewRepository.findMany({
      select: { id: true, thumbnail: true, userId: true, sejul: true },
      where: { bookname, type: this.type.published },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addDetailInfoToPagedBookReviews(bookReviews);
  }

  // 카테고리로 독후감 검색 - pagination
  async findPagesByCategory({
    category,
    targetId,
  }: GetBookReviewPageByCategoryRequest): Promise<GetBookReviewPageResponse[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const { id: categoryId } = await this.categoryService.findId(category);
    const bookReviews = await this.bookReviewRepository.findMany({
      select: { id: true, thumbnail: true, userId: true, sejul: true },
      where: { categoryId, type: this.type.published },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addDetailInfoToPagedBookReviews(bookReviews);
  }

  // 태그로 독후감 검색 - pagination
  async findPagesByTag({
    tag,
    targetId,
  }: GetBookReviewPageByTagRequest): Promise<GetBookReviewPageResponse[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const tags = await this.tagService.findAllBookReviewIdByTagName(tag);
    const bookReivewIds = tags.map(({ bookReviewId }) => bookReviewId);

    const bookReviews = await this.bookReviewRepository.findMany({
      select: { id: true, thumbnail: true, userId: true, sejul: true },
      where: { id: { in: bookReivewIds }, type: this.type.published },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 12,
    });

    return this.addDetailInfoToPagedBookReviews(bookReviews);
  }

  // 관심 서재 독후감 - pagination
  async findFollowingPages({
    followerId,
    targetId,
  }: GetFollowingBookReviewPageRequest): Promise<GetBookReviewPageResponse[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxId();
    }

    if (maxId === null) {
      return [];
    }

    const followingIds = await this.followService.findAllFollowingId(
      followerId,
    );
    const bookReviews = await this.bookReviewRepository.findMany({
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

    return this.addDetailInfoToPagedBookReviews(bookReviews);
  }

  private async findMaxId(): Promise<Id | null> {
    const result = await this.bookReviewRepository.findFirst({
      select: { id: true },
      orderBy: { id: 'desc' },
    });

    if (result) {
      return result.id;
    }

    return null;
  }

  private async addWritersToHomeBookReviews(
    bookReviews: (Omit<GetHomeBookReviewResponse, 'writer' | 'createdAt'> & {
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

  private async addDetailInfoToPagedBookReviews(
    bookReviews: Omit<
      GetBookReviewPageResponse,
      'writer' | 'commentCount' | 'likeCount'
    >[],
  ) {
    const promises = bookReviews.map(async ({ id, userId, ...bookReview }) => {
      const [{ name: writer }, commentCount, likeCount] = await Promise.all([
        this.userService.findNameById(userId),
        this.commentService.countByBookReview(id),
        this.likeService.countByBookReview(id),
      ]);

      return { ...bookReview, id, userId, writer, commentCount, likeCount };
    });

    return Promise.all(promises);
  }

  // eslint-disable-next-line class-methods-use-this
  private validate(
    bookReview:
      | CreateBookReviewReqeust
      | CreateBookReviewReqeust
      | UpdateBookReviewRequest
      | UpdateBookReviewRequest,
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
