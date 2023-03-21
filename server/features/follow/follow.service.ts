import { HttpResponse } from 'server/types/http';
import { UserId } from '../user/user.dto';
import followModel from './follow.model';

interface FollowInfo {
  followerCount: number;
  followingCount: number;
  isFollow: boolean;
}

const followService = {
  getFollowInfo: async ({
    targetUserId,
    myUserId,
  }: {
    targetUserId: UserId;
    myUserId?: UserId;
  }): Promise<HttpResponse<FollowInfo>> => {
    const followerCount = await followModel.getFollowerCount({
      follower_id: targetUserId,
    });

    const followingCount = await followModel.getFollowingCount({
      following_id: targetUserId,
    });

    const isFollow = myUserId
      ? await followModel.getIsFollow({
          follower_id: targetUserId,
          following_id: myUserId,
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
