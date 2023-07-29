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
  private followRepository = new PrismaClient().follow;

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
    const result = await this.followRepository.findMany({
      select: { followingId: true },
      where: { followerId },
    });

    return result.map(({ followingId }) => followingId);
  }

  async findAllFollowerId(followingId: UserId): Promise<UserId[]> {
    const result = await this.followRepository.findMany({
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

    return this.followRepository.findMany({
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

    return this.followRepository.findMany({
      select: { id: true, followerId: true },
      where: { followingId },
      orderBy: { id: 'desc' },
      cursor: { id: maxId },
      skip: targetId ? 1 : 0,
      take: 10,
    });
  }

  async has({ myUserId, targetUserId }: FollowDefaultReqeust) {
    const follow = await this.followRepository.findFirst({
      where: { followerId: myUserId, followingId: targetUserId },
    });

    return !!follow;
  }

  async countFollwing(followerId: UserId) {
    return this.followRepository.count({ where: { followerId } });
  }

  async countFollower(followingId: UserId) {
    return this.followRepository.count({ where: { followingId } });
  }

  async create({ myUserId, targetUserId }: FollowDefaultReqeust) {
    await this.followRepository.create({
      data: { followerId: myUserId, followingId: targetUserId },
    });
  }

  async delete({ myUserId, targetUserId }: FollowDefaultReqeust) {
    await this.followRepository.deleteMany({
      where: { followerId: myUserId, followingId: targetUserId },
    });
  }

  async deleteAllByUser(userId: UserId) {
    await this.followRepository.deleteMany({
      where: {
        OR: [{ followerId: userId }, { followingId: userId }],
      },
    });
  }

  private async findMaxIdByFollowingId(followingId: UserId) {
    const result = await this.followRepository.findFirst({
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
    const result = await this.followRepository.findFirst({
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
