import { PrismaClient } from '@prisma/client';
import { NotFoundException, BadRequestException } from 'server/exceptions';
import { Id, Introduce, Name, Sub } from './dto';
import { CreateUserRequestDTO } from './dto/create-user.dto';
import { UpdateUserRequestDTO } from './dto/update-user.dto';
import {
  FindSearchedUserResponseDTO,
  FindUserIdBySubResponseDTO,
  FindUserIdResponseDTO,
  FindUserNameResponseDTO,
  FindUserResponseDTO,
} from './dto/find-user.dto';
import {
  FindPagedUserRequestDTO,
  FindPagedUserResponseDTO,
} from './dto/find-paged-user.dto';

import FollowService from '../follow/follow.service';
import CommentService from '../comment/comment.service';
import LikeService from '../like/like.service';

class UserService {
  private user = new PrismaClient().user;

  private notFoundMessage = '사용자를 찾을 수 없습니다.';

  async findAllId(): Promise<FindUserIdResponseDTO[]> {
    return this.user.findMany({ select: { id: true } });
  }

  async findAllByNamePrefix(
    name: Name,
  ): Promise<FindSearchedUserResponseDTO[]> {
    return this.user.findMany({
      select: { id: true, name: true, introduce: true },
      where: { name: { search: `${name}*` } },
      take: 10,
    });
  }

  async findById(id: Id): Promise<FindUserResponseDTO> {
    const user = await this.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(this.notFoundMessage);
    }

    return user;
  }

  async findByName(name: Name): Promise<FindUserResponseDTO> {
    const user = await this.user.findUnique({ where: { name } });

    if (!user) {
      throw new NotFoundException(this.notFoundMessage);
    }

    return user;
  }

  async findIdBySub(sub: Sub): Promise<FindUserIdBySubResponseDTO> {
    const user = await this.user.findFirst({
      select: { id: true },
      where: { sub },
    });

    if (user) {
      return { id: user.id };
    }

    return { id: null };
  }

  async findNameById(id: Id): Promise<FindUserNameResponseDTO> {
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
    targetId,
  }: FindPagedUserRequestDTO): Promise<FindPagedUserResponseDTO[]> {
    const followerIds = await new FollowService().findPagedFollowers({
      followingId: id,
      targetId,
    });

    const nextTargetId = followerIds[followerIds.length - 1].id;

    const promises = followerIds.map(async ({ followerId }) => {
      const follower = await this.user.findUnique({
        select: { id: true, name: true, introduce: true },
        where: { id: followerId },
      });

      if (!follower) {
        throw new NotFoundException(`${followerId} 사용자를 찾을 수 없습니다.`);
      }

      return { ...follower, nextTargetId };
    });

    return Promise.all(promises);
  }

  async findPagedFollowings({
    id,
    targetId,
  }: FindPagedUserRequestDTO): Promise<FindPagedUserResponseDTO[]> {
    const followingIds = await new FollowService().findPagedFollowings({
      followerId: id,
      targetId,
    });

    const nextTargetId = followingIds[followingIds.length - 1].id;

    const promises = followingIds.map(async ({ followingId }) => {
      const following = await this.user.findUnique({
        select: { id: true, name: true, introduce: true },
        where: { id: followingId },
      });

      if (!following) {
        throw new NotFoundException(
          `${followingId} 사용자를 찾을 수 없습니다.`,
        );
      }

      return { ...following, nextTargetId };
    });

    return Promise.all(promises);
  }

  async create(user: CreateUserRequestDTO) {
    await this.validate(user.name, user.introduce);

    if (![0, 1, 2].includes(user.gender)) {
      throw new BadRequestException('잘못된 성별 형식입니다.');
    }

    await this.user.create({
      data: { ...user, age: user.age || 'null' },
    });
  }

  async update({ id, name, introduce }: UpdateUserRequestDTO) {
    await this.validate(name, introduce);
    await this.user.update({
      data: { name, introduce },
      where: { id },
    });
  }

  async delete(id: Id) {
    await Promise.all([
      new CommentService().deleteAllByUser(id),
      new LikeService().deleteAllByUser(id),
      new FollowService().deleteAllByUser(id),
      this.user.delete({ where: { id } }),
    ]);
  }

  private async validate(name: Name, introduce: Introduce) {
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

    const isDuplicateName = !!(await this.findByName(lowerCaseName));

    if (isDuplicateName) {
      throw new BadRequestException(
        '해당 이름은 이미 다른 사용자가 사용하고 있습니다.',
      );
    }

    if (introduce.length > 100) {
      throw new BadRequestException('100자 이하의 소개만 사용할 수 있습니다.');
    }
  }
}

export default UserService;

export type {
  Id,
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  FindPagedUserRequestDTO,
};
