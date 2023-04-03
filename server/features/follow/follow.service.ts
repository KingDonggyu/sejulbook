import { HttpResponse } from 'server/types/http';
import { UserId } from '../user/user.dto';
import { FollowDTO } from './follow.dto';
import followModel from './follow.model';

interface FollowInfo {
  followerCount: number;
  followingCount: number;
  isFollow: boolean;
}

const followService = {
  subscribe: async ({
    followerId,
    followingId,
  }: Omit<FollowDTO, 'id'>): Promise<HttpResponse<undefined>> => {
    await followModel.createFollow({
      follower_id: followerId,
      following_id: followingId,
    });

    return { error: false, data: undefined };
  },

  unsubscribe: async ({
    followerId,
    followingId,
  }: Omit<FollowDTO, 'id'>): Promise<HttpResponse<undefined>> => {
    await followModel.deleteFollow({
      follower_id: followerId,
      following_id: followingId,
    });

    return { error: false, data: undefined };
  },

  getFollowInfo: async ({
    targetUserId,
    myUserId,
  }: {
    targetUserId: UserId;
    myUserId?: UserId;
  }): Promise<HttpResponse<FollowInfo>> => {
    const result = await Promise.allSettled([
      followModel.getFollowerCount({
        following_id: targetUserId,
      }),
      followModel.getFollowingCount({
        follower_id: targetUserId,
      }),
      myUserId
        ? await followModel.getIsFollow({
            follower_id: myUserId,
            following_id: targetUserId,
          })
        : false,
    ]);

    const followerCount =
      result[0].status === 'fulfilled' ? result[0].value : 0;

    const followingCount =
      result[1].status === 'fulfilled' ? result[1].value : 0;

    const isFollow = result[2].status === 'fulfilled' ? result[2].value : false;

    return {
      error: false,
      data: {
        followerCount,
        followingCount,
        isFollow,
      },
    };
  },
};

export default followService;
