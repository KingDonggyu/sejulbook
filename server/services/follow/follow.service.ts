import { PrismaClient } from '@prisma/client';
import { FollowDefaultReqeustDto, Id, UserId } from './dto';
import {
  FindPagedFollowingsRequestDTO,
  FindPagedFollowingResponseDTO,
} from './dto/find-following.dto';
import {
  FindPagedFollowersRequestDTO,
  FindPagedFollowerResponseDTO,
} from './dto/find-follower.dto';

class FollowService {
  private follow = new PrismaClient().follow;

  async findAllFollowing(followerId: UserId): Promise<UserId[]> {
    const result = await this.follow.findMany({
      select: { following_id: true },
      where: { follower_id: followerId },
    });

    return result.map(({ following_id }) => following_id);
  }

  async findPagedFollowings({
    followerId,
    targetId,
  }: FindPagedFollowingsRequestDTO): Promise<FindPagedFollowingResponseDTO[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxIdByFollowerId(followerId);
    }

    if (maxId === null) {
      return [];
    }

    const pagedFollowingId = await this.follow.findMany({
      select: { id: true, following_id: true },
      where: { follower_id: followerId },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 10,
    });

    return pagedFollowingId.map(({ id, following_id }) => ({
      id,
      followingId: following_id,
    }));
  }

  async findPagedFollowers({
    followingId,
    targetId,
  }: FindPagedFollowersRequestDTO): Promise<FindPagedFollowerResponseDTO[]> {
    let maxId = targetId;

    if (maxId === null) {
      maxId = await this.findMaxIdByFollowingId(followingId);
    }

    if (maxId === null) {
      return [];
    }

    const pagedFollowerId = await this.follow.findMany({
      select: { id: true, follower_id: true },
      where: { following_id: followingId },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 10,
    });

    return pagedFollowerId.map(({ id, follower_id }) => ({
      id,
      followerId: follower_id,
    }));
  }

  async has({ followerId, followingId }: FollowDefaultReqeustDto) {
    const follow = await this.follow.findFirst({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
    return !!follow;
  }

  async countFollwing(followerId: UserId) {
    return this.follow.count({
      where: { follower_id: followerId },
    });
  }

  async countFollower(followingId: UserId) {
    return this.follow.count({
      where: { following_id: followingId },
    });
  }

  async create({ followerId, followingId }: FollowDefaultReqeustDto) {
    this.follow.create({
      data: { follower_id: followerId, following_id: followingId },
    });
  }

  async delete({ followerId, followingId }: FollowDefaultReqeustDto) {
    this.follow.deleteMany({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
  }

  async deleteAllByUser(userId: UserId) {
    this.follow.deleteMany({
      where: {
        OR: [{ follower_id: userId }, { following_id: userId }],
      },
    });
  }

  private async findMaxIdByFollowingId(
    followingId: UserId,
  ): Promise<Id | null> {
    const result = await this.follow.findFirst({
      select: { id: true },
      where: { following_id: followingId },
      orderBy: { id: 'desc' },
    });

    if (result === null) {
      return null;
    }

    return result.id;
  }

  private async findMaxIdByFollowerId(followerId: UserId): Promise<Id | null> {
    const result = await this.follow.findFirst({
      select: { id: true },
      where: { follower_id: followerId },
      orderBy: { id: 'desc' },
    });

    if (result === null) {
      return null;
    }

    return result.id;
  }
}

export default FollowService;
