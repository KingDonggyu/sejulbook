import { PrismaClient } from '@prisma/client';
import { NotFoundException, BadRequestException } from '@/server/exceptions';

import type {
  Id,
  Name,
  Sub,
  Introduce,
  GetSearchedUserResponse,
  GetUserResponse,
  GetUserPageRequest,
  GetUserPageResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from 'user';

import type FollowService from './follow.service';
import type CommentService from './comment.service';
import type LikeService from './like.service';

interface Services {
  followService: FollowService;
  commentService: CommentService;
  likeService: LikeService;
}

class UserService {
  private user = new PrismaClient().user;

  private followService: FollowService;

  private commentService: CommentService;

  private likeService: LikeService;

  private notFoundMessage = '사용자를 찾을 수 없습니다.';

  constructor({ followService, commentService, likeService }: Services) {
    this.followService = followService;
    this.commentService = commentService;
    this.likeService = likeService;
  }

  async findAllId() {
    return this.user.findMany({ select: { id: true } });
  }

  async findAllByNamePrefix(name: Name): Promise<GetSearchedUserResponse[]> {
    return this.user.findMany({
      select: { id: true, name: true, introduce: true },
      where: { name: { search: `${name}*` } },
      take: 10,
    });
  }

  async findById(id: Id): Promise<GetUserResponse> {
    const user = await this.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(this.notFoundMessage);
    }

    return { ...user, joindated: user.joindated.toString() };
  }

  async findIdBySub(sub: Sub) {
    const user = await this.user.findFirst({
      select: { id: true },
      where: { sub },
    });

    if (user) {
      return { id: user.id };
    }

    return { id: null };
  }

  async findNameById(id: Id) {
    const user = await this.user.findUnique({
      select: { name: true },
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(this.notFoundMessage);
    }

    return user;
  }

  async findPagedFollowers({
    id,
    myUserId,
    targetId,
  }: GetUserPageRequest): Promise<GetUserPageResponse[]> {
    const emptyArray: number[] = [];
    const [followerIds, myFollowingIds] = await Promise.all([
      this.followService.findPagedFollowers({ followingId: id, targetId }),
      myUserId ? this.followService.findAllFollowingId(myUserId) : emptyArray,
    ]);

    const promises = followerIds.map(async ({ id: followId, followerId }) => {
      const follower = await this.user.findUnique({
        select: { id: true, name: true, introduce: true },
        where: { id: followerId },
      });

      if (!follower) {
        throw new NotFoundException(`${followerId} 사용자를 찾을 수 없습니다.`);
      }

      return {
        ...follower,
        followId,
        isFollow: myFollowingIds.includes(follower.id),
      };
    });

    return Promise.all(promises);
  }

  async findPagedFollowings({
    id,
    myUserId,
    targetId,
  }: GetUserPageRequest): Promise<GetUserPageResponse[]> {
    const emptyArray: number[] = [];
    const [followingIds, myFollowingIds] = await Promise.all([
      this.followService.findPagedFollowings({ followerId: id, targetId }),
      myUserId ? this.followService.findAllFollowingId(myUserId) : emptyArray,
    ]);

    const promises = followingIds.map(async ({ id: followId, followingId }) => {
      const following = await this.user.findUnique({
        select: { id: true, name: true, introduce: true },
        where: { id: followingId },
      });

      if (!following) {
        throw new NotFoundException(
          `${followingId} 사용자를 찾을 수 없습니다.`,
        );
      }

      return {
        ...following,
        followId,
        isFollow: myFollowingIds.includes(following.id),
      };
    });

    return Promise.all(promises);
  }

  async create(user: CreateUserRequest) {
    await this.validate(user.name, user.introduce);

    if (![0, 1, 2].includes(user.gender)) {
      throw new BadRequestException('잘못된 성별 형식입니다.');
    }

    await this.user.create({
      data: {
        sub: user.sub,
        name: user.name,
        introduce: user.introduce,
        email: user.email,
        gender: user.gender,
        age: user.age || 'null',
      },
    });
  }

  async update({ id, name, introduce }: UpdateUserRequest) {
    const user = await this.user.findUnique({
      select: { name: true },
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`${id} 사용자를 찾을 수 없습니다.`);
    }

    await this.validate(name, introduce, name !== user.name);
    await this.user.update({
      data: { name, introduce },
      where: { id },
    });
  }

  async delete(id: Id) {
    await Promise.all([
      this.commentService.deleteAllByUser(id),
      this.likeService.deleteAllByUser(id),
      this.followService.deleteAllByUser(id),
      this.user.delete({ where: { id } }),
    ]);
  }

  async checkDuplicateName(name: Name): Promise<boolean> {
    const user = await this.user.findUnique({ where: { name } });
    return !!user;
  }

  private async validate(
    name: Name,
    introduce: Introduce,
    checkNameDuplicate = true,
  ) {
    if (name === '') {
      throw new BadRequestException('이름을 입력해주세요.');
    }

    if (name.length < 2 || name.length > 10) {
      throw new BadRequestException(
        '2자 이상 10자 이하의 이름만 사용할 수 있습니다.',
      );
    }

    const lowerCaseName = name.toLowerCase();

    if (!/^[가-힣|a-z|0-9|]+$/.test(lowerCaseName)) {
      throw new BadRequestException(
        '이름에는 문자와 숫자만 사용할 수 있습니다.',
      );
    }

    if (checkNameDuplicate) {
      const isDuplicateName = await this.checkDuplicateName(lowerCaseName);
      if (isDuplicateName) {
        throw new BadRequestException(
          '해당 이름은 이미 다른 사용자가 사용하고 있습니다.',
        );
      }
    }

    if (introduce.length > 100) {
      throw new BadRequestException('100자 이하의 소개만 사용할 수 있습니다.');
    }
  }
}

export default UserService;
