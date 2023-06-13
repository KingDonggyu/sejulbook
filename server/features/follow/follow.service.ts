import { PrismaClient } from '@prisma/client';
import { HttpResponse } from 'server/types/http';
import FollowDto, { UserId } from './follow.dto';

class FollowService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async has({
    followerId,
    followingId,
  }: FollowDto): Promise<HttpResponse<boolean>> {
    const follow = await this.prisma.follow.findFirst({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
    return { error: false, data: !!follow };
  }

  async countFollwing(followerId: UserId): Promise<HttpResponse<number>> {
    const count = await this.prisma.follow.count({
      where: { follower_id: followerId },
    });
    return { error: false, data: count };
  }

  async countFollower(followingId: UserId): Promise<HttpResponse<number>> {
    const count = await this.prisma.follow.count({
      where: { following_id: followingId },
    });
    return { error: false, data: count };
  }

  async create({
    followerId,
    followingId,
  }: FollowDto): Promise<HttpResponse<undefined>> {
    await this.prisma.follow.create({
      data: { follower_id: followerId, following_id: followingId },
    });
    return { error: false, data: undefined };
  }

  async delete({
    followerId,
    followingId,
  }: FollowDto): Promise<HttpResponse<undefined>> {
    await this.prisma.follow.deleteMany({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
    return { error: false, data: undefined };
  }

  async deleteAllByUser(userId: UserId) {
    await this.prisma.follow.deleteMany({
      where: {
        follower_id: userId,
        following_id: userId,
      },
    });
    return { error: false, data: undefined };
  }
}

export default FollowService;
