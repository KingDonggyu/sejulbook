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
    const followerCount = await followModel.getFollowerCount({
      following_id: targetUserId,
    });

    const followingCount = await followModel.getFollowingCount({
      follower_id: targetUserId,
    });

    const isFollow = myUserId
      ? await followModel.getIsFollow({
          follower_id: myUserId,
          following_id: targetUserId,
        })
      : false;

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
