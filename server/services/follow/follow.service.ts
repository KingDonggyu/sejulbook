import { PrismaClient } from '@prisma/client';
import { FollowDefaultReqeustDto, Id, UserId } from './dto';
import { FindInfoRequestDTO, FindInfoResponseDTO } from './dto/find-info.dto';
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

  async findFollowInfo({
    myUserId,
    targetUserId,
  }: FindInfoRequestDTO): Promise<FindInfoResponseDTO> {
    const [isFollow, followerCount, followingCount] = await Promise.all([
      myUserId
        ? this.has({ followerId: myUserId, followingId: targetUserId })
        : false,
      this.countFollower(targetUserId),
      this.countFollwing(targetUserId),
    ]);

    return { isFollow, followerCount, followingCount };
  }

  async findAllFollowing(followerId: UserId): Promise<UserId[]> {
    const result = await this.follow.findMany({
      select: { followingId: true },
      where: { followerId },
    });

    return result.map(({ followingId }) => followingId);
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

    return this.follow.findMany({
      select: { id: true, followingId: true },
      where: { followerId },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 10,
    });
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

    return this.follow.findMany({
      select: { id: true, followerId: true },
      where: { followingId },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 10,
    });
  }

  async has({ followerId, followingId }: FollowDefaultReqeustDto) {
    const follow = await this.follow.findFirst({
      where: { followerId, followingId },
    });

    return !!follow;
  }

  async countFollwing(followerId: UserId) {
    return this.follow.count({ where: { followerId } });
  }

  async countFollower(followingId: UserId) {
    return this.follow.count({ where: { followingId } });
  }

  async create({ followerId, followingId }: FollowDefaultReqeustDto) {
    this.follow.create({ data: { followerId, followingId } });
  }

  async delete({ followerId, followingId }: FollowDefaultReqeustDto) {
    this.follow.deleteMany({ where: { followerId, followingId } });
  }

  async deleteAllByUser(userId: UserId) {
    this.follow.deleteMany({
      where: {
        OR: [{ followerId: userId }, { followingId: userId }],
      },
    });
  }

  private async findMaxIdByFollowingId(
    followingId: UserId,
  ): Promise<Id | null> {
    const result = await this.follow.findFirst({
      select: { id: true },
      where: { followingId },
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
      where: { followerId },
      orderBy: { id: 'desc' },
    });

    if (result === null) {
      return null;
    }

    return result.id;
  }
}

export default FollowService;
