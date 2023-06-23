import { PrismaClient } from '@prisma/client';
import type {
  FollowDefaultReqeust,
  GetFollowInfoRequest,
  GetFollowInfoResponse,
  GetFollowerPageRequest,
  GetFollowerPageResponse,
  GetFollowingPageRequest,
  GetFollowingPageResponse,
  UserId,
} from 'follow';

class FollowService {
  private follow = new PrismaClient().follow;

  async findFollowInfo({
    myUserId,
    targetUserId,
  }: GetFollowInfoRequest): Promise<GetFollowInfoResponse> {
    const [isFollow, followerCount, followingCount] = await Promise.all([
      myUserId ? this.has({ myUserId, targetUserId }) : false,
      this.countFollower(targetUserId),
      this.countFollwing(targetUserId),
    ]);

    return { isFollow, followerCount, followingCount };
  }

  async findAllFollowingId(followerId: UserId): Promise<UserId[]> {
    const result = await this.follow.findMany({
      select: { followingId: true },
      where: { followerId },
    });

    return result.map(({ followingId }) => followingId);
  }

  async findAllFollowerId(followingId: UserId): Promise<UserId[]> {
    const result = await this.follow.findMany({
      select: { followerId: true },
      where: { followingId },
    });

    return result.map(({ followerId }) => followerId);
  }

  async findPagedFollowings({
    followerId,
    targetId,
  }: GetFollowingPageRequest): Promise<GetFollowingPageResponse[]> {
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
  }: GetFollowerPageRequest): Promise<GetFollowerPageResponse[]> {
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

  async has({ myUserId, targetUserId }: FollowDefaultReqeust) {
    const follow = await this.follow.findFirst({
      where: { followerId: myUserId, followingId: targetUserId },
    });

    return !!follow;
  }

  async countFollwing(followerId: UserId) {
    return this.follow.count({ where: { followerId } });
  }

  async countFollower(followingId: UserId) {
    return this.follow.count({ where: { followingId } });
  }

  async create({ myUserId, targetUserId }: FollowDefaultReqeust) {
    await this.follow.create({
      data: { followerId: myUserId, followingId: targetUserId },
    });
  }

  async delete({ myUserId, targetUserId }: FollowDefaultReqeust) {
    await this.follow.deleteMany({
      where: { followerId: myUserId, followingId: targetUserId },
    });
  }

  async deleteAllByUser(userId: UserId) {
    await this.follow.deleteMany({
      where: {
        OR: [{ followerId: userId }, { followingId: userId }],
      },
    });
  }

  private async findMaxIdByFollowingId(followingId: UserId) {
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

  private async findMaxIdByFollowerId(followerId: UserId) {
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
