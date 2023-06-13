import { PrismaClient } from '@prisma/client';
import { HttpResponse, HttpSuccess } from 'server/types/http';
import userUtils from './user.util';
import FollowService from '../follow/follow.service';

import UserDto, {
  Id,
  Name,
  Sub,
  CreateUserDto,
  UpdateUserDto,
  RequestPagedUserDto,
  ResponsePagedUserDto,
  ResponseSerchedUserDto,
} from './user.dto';

class UserService {
  private model = new PrismaClient().user;

  async findAllId(): Promise<HttpResponse<Id[]>> {
    const ids = await this.model.findMany({ select: { id: true } });
    return { error: false, data: ids.map(({ id }) => id) };
  }

  async findAllByNamePrefix(
    name: Name,
  ): Promise<HttpSuccess<ResponseSerchedUserDto>> {
    const users = await this.model.findMany({
      select: { id: true, nick: true, introduce: true },
      where: { nick: { search: `${name}*` } },
      take: 10,
    });

    return {
      error: false,
      data: users.map(({ id, nick, introduce }) => ({
        id,
        introduce,
        name: nick,
      })),
    };
  }

  async findById(id: Id): Promise<HttpResponse<UserDto>> {
    const user = await this.model.findUnique({ where: { id } });
    if (user) {
      return { error: false, data: userUtils.entityToDto(user) };
    }
    return userUtils.notFoundException;
  }

  async findByName(name: Name): Promise<HttpResponse<UserDto>> {
    const user = await this.model.findUnique({ where: { nick: name } });
    if (user) {
      return { error: false, data: userUtils.entityToDto(user) };
    }
    return userUtils.notFoundException;
  }

  async findIdBySub(sub: Sub): Promise<HttpResponse<Id | null>> {
    const result = await this.model.findFirst({
      select: { id: true },
      where: { sub },
    });
    if (result) {
      return { error: false, data: result.id };
    }
    return { error: false, data: result };
  }

  async findNameById(id: Id): Promise<HttpResponse<Name>> {
    const result = await this.model.findUnique({
      select: { nick: true },
      where: { id },
    });
    if (result) {
      return { error: false, data: result.nick };
    }
    return { error: false, data: 'unknown' };
  }

  async findPagedFollowers({
    id,
    targetId,
  }: RequestPagedUserDto): Promise<HttpResponse<ResponsePagedUserDto>> {
    const { data } = await new FollowService().findPagedFollowers({
      followingId: id,
      targetId,
    });

    const nextTargetId = data[data.length - 1].id;

    try {
      const promises = data.map(async ({ followerId }) => {
        const follower = await this.model.findUnique({
          select: { id: true, nick: true, introduce: true },
          where: { id: followerId },
        });

        if (!follower) {
          throw new Error();
        }

        return {
          id: follower.id,
          name: follower.nick,
          introduce: follower.introduce,
          targetId: nextTargetId,
        };
      });

      const followers = await Promise.all(promises);
      return { error: false, data: followers };
    } catch {
      return userUtils.notFoundException;
    }
  }

  async findPagedFollowing({
    id,
    targetId,
  }: RequestPagedUserDto): Promise<HttpResponse<ResponsePagedUserDto>> {
    const { data } = await new FollowService().findPagedFollowings({
      followerId: id,
      targetId,
    });

    const nextTargetId = data[data.length - 1].id;

    try {
      const promises = data.map(async ({ followingId }) => {
        const following = await this.model.findUnique({
          select: { id: true, nick: true, introduce: true },
          where: { id: followingId },
        });

        if (!following) {
          throw new Error();
        }

        return {
          id: following.id,
          name: following.nick,
          introduce: following.introduce,
          targetId: nextTargetId,
        };
      });

      const followings = await Promise.all(promises);
      return { error: false, data: followings };
    } catch {
      return userUtils.notFoundException;
    }
  }

  async create(user: CreateUserDto): Promise<HttpResponse<undefined>> {
    const validation = await this.validate(user.name, user.introduce);

    if (validation.error) {
      return validation;
    }

    await this.model.create({
      data: {
        ...user,
        nick: user.name,
        age: user.age || 'null',
      },
    });

    return { error: false, data: undefined };
  }

  async update({
    id,
    name,
    introduce,
  }: UpdateUserDto): Promise<HttpResponse<undefined>> {
    const validation = await this.validate(name, introduce);

    if (validation.error) {
      return validation;
    }

    await this.model.update({
      data: { nick: name, introduce },
      where: { id },
    });

    return { error: false, data: undefined };
  }

  async delete(id: Id): Promise<HttpResponse<undefined>> {
    await this.model.delete({
      where: { id },
    });
    return { error: false, data: undefined };
  }

  private async validate(
    name: string,
    introduce: string,
  ): Promise<HttpResponse<undefined>> {
    if (name === '') {
      return userUtils.emptyNameException;
    }

    if (userUtils.checkIsLimitReachedName(name)) {
      return userUtils.limitReachedNameException;
    }

    if (!userUtils.checkIsMatchedPatternName(name)) {
      return userUtils.notMatchedPatternNameException;
    }

    const lowerCaseName = name.toLowerCase();
    const isDuplicateName = !!(await this.findByName(lowerCaseName));

    if (isDuplicateName) {
      return userUtils.duplicateNameException;
    }

    if (!userUtils.checkIsLimitReachedIntroduce(introduce)) {
      return userUtils.limitReachedIntroduceException;
    }

    return { error: false, data: undefined };
  }
}

export default UserService;
