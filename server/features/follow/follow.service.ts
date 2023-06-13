import { PrismaClient } from '@prisma/client';
import { HttpResponse, HttpSuccess } from 'server/types/http';

import FollowDto, {
  RequestFindPagedFollowerDto,
  RequestFindPagedFollowingDto,
  Id,
  UserId,
  ResponseFindPagedFollowerDto,
  ResponseFindPagedFollowingDto,
} from './follow.dto';

class FollowService {
  private model = new PrismaClient().follow;

  async findPagedFollowings({
    followerId,
    targetId,
  }: RequestFindPagedFollowingDto): Promise<
    HttpSuccess<ResponseFindPagedFollowingDto>
  > {
    let maxId = targetId;

    if (maxId === null) {
      const { data } = await this.findMaxIdByFollowerId(followerId);
      maxId = data;
    }

    if (maxId === null) {
      return { error: false, data: [] };
    }

    const pagedFollowingId = await this.model.findMany({
      select: { id: true, following_id: true },
      where: { follower_id: followerId },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 10,
    });

    return {
      error: false,
      data: pagedFollowingId.map(({ id, following_id }) => ({
        id,
        followingId: following_id,
      })),
    };
  }

  async findPagedFollowers({
    followingId,
    targetId,
  }: RequestFindPagedFollowerDto): Promise<
    HttpSuccess<ResponseFindPagedFollowerDto>
  > {
    let maxId = targetId;

    if (maxId === null) {
      const { data } = await this.findMaxIdByFollowingId(followingId);
      maxId = data;
    }

    if (maxId === null) {
      return { error: false, data: [] };
    }

    const pagedFollowerId = await this.model.findMany({
      select: { id: true, follower_id: true },
      where: { following_id: followingId },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 10,
    });

    return {
      error: false,
      data: pagedFollowerId.map(({ id, follower_id }) => ({
        id,
        followerId: follower_id,
      })),
    };
  }

  async findMaxIdByFollowingId(
    followingId: UserId,
  ): Promise<HttpSuccess<Id | null>> {
    const result = await this.model.findFirst({
      select: { id: true },
      where: { following_id: followingId },
      orderBy: { id: 'desc' },
    });

    if (result === null) {
      return { error: false, data: null };
    }

    return { error: false, data: result.id };
  }

  async findMaxIdByFollowerId(
    followerId: UserId,
  ): Promise<HttpSuccess<Id | null>> {
    const result = await this.model.findFirst({
      select: { id: true },
      where: { follower_id: followerId },
      orderBy: { id: 'desc' },
    });

    if (result === null) {
      return { error: false, data: null };
    }

    return { error: false, data: result.id };
  }

  async has({
    followerId,
    followingId,
  }: FollowDto): Promise<HttpResponse<boolean>> {
    const follow = await this.model.findFirst({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
    return { error: false, data: !!follow };
  }

  async countFollwing(followerId: UserId): Promise<HttpResponse<number>> {
    const count = await this.model.count({
      where: { follower_id: followerId },
    });
    return { error: false, data: count };
  }

  async countFollower(followingId: UserId): Promise<HttpResponse<number>> {
    const count = await this.model.count({
      where: { following_id: followingId },
    });
    return { error: false, data: count };
  }

  async create({
    followerId,
    followingId,
  }: FollowDto): Promise<HttpResponse<undefined>> {
    await this.model.create({
      data: { follower_id: followerId, following_id: followingId },
    });
    return { error: false, data: undefined };
  }

  async delete({
    followerId,
    followingId,
  }: FollowDto): Promise<HttpResponse<undefined>> {
    await this.model.deleteMany({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
    return { error: false, data: undefined };
  }

  async deleteAllByUser(userId: UserId) {
    await this.model.deleteMany({
      where: {
        follower_id: userId,
        following_id: userId,
      },
    });
    return { error: false, data: undefined };
  }
}

export default FollowService;
