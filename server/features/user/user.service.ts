import { HttpResponse } from 'server/types/http';
import { userError } from 'server/constants/message';
import UserDTO, { UserId } from './user.dto';
import userModel from './user.model';
import UserGuard from './user.guard';
import { FollowId } from '../follow/follow.dto';
import followModel from '../follow/follow.model';

type User = Pick<UserDTO, 'id' | 'name' | 'introduce'>;

interface FollowUser {
  myUserId?: UserId;
  targetUserId: UserId;
  isFollowing: boolean;
  maxFollowId: FollowId | null;
}

const userService = {
  getUserId: async ({
    sub,
  }: Pick<UserDTO, 'sub'>): Promise<
    HttpResponse<Pick<UserDTO, 'id'> | { id: null }>
  > => {
    const result = await userModel.getUserId({ sub });

    return {
      error: false,
      data: { id: result },
    };
  },

  getUserById: async ({
    id,
  }: Pick<UserDTO, 'id'>): Promise<HttpResponse<User>> => {
    const userGuard = new UserGuard({ id });
    const guardResult = userGuard.checkUserNotFound();

    if (guardResult) {
      return guardResult;
    }

    const result = await userModel.getUserById({ id });

    if (result === null) {
      return {
        error: true,
        code: 404,
        message: userError.USER_NOT_FOUND,
      };
    }

    return {
      error: false,
      data: {
        id: result.id,
        name: result.nick,
        introduce: result.introduce,
      },
    };
  },

  getUserByName: async ({
    name,
  }: Pick<UserDTO, 'name'>): Promise<HttpResponse<User | null>> => {
    const result = await userModel.getUserByName({ nick: name });

    if (!result) {
      return {
        error: false,
        data: null,
      };
    }

    return {
      error: false,
      data: {
        id: result.id,
        name: result.nick,
        introduce: result.introduce,
      },
    };
  },

  updateUser: async ({
    id,
    name,
    introduce,
  }: Pick<UserDTO, 'id' | 'name' | 'introduce'>): Promise<
    HttpResponse<undefined>
  > => {
    const userGuard = new UserGuard({ id, name, introduce });
    const guardResult = userGuard.checkInvalidProfile();

    if (guardResult) {
      return guardResult;
    }

    const lowerCaseName = name.toLowerCase();
    const otherUser = await userModel.getUserByName({
      nick: lowerCaseName,
    });

    if (otherUser && otherUser.id !== id) {
      return {
        error: true,
        code: 400,
        message: userError.DUPLICATE_NAME,
      };
    }

    await userModel.updateUser({ id, nick: lowerCaseName, introduce });
    return { error: false, data: undefined };
  },

  signUp: async (user: UserDTO): Promise<HttpResponse<undefined>> => {
    const userGuard = new UserGuard(user);
    const guardResult = userGuard.checkInvalidProfile();

    if (guardResult) {
      return guardResult;
    }

    const lowerCaseName = user.name.toLowerCase();
    const isDuplicateName = !!(await userModel.getUserByName({
      nick: lowerCaseName,
    }));

    if (isDuplicateName) {
      return {
        error: true,
        code: 400,
        message: userError.DUPLICATE_NAME,
      };
    }

    await userModel.createUser({ ...user, nick: lowerCaseName });
    return { error: false, data: undefined };
  },

  getFollowUserList: async ({
    myUserId,
    targetUserId,
    maxFollowId,
    isFollowing,
  }: FollowUser): Promise<
    HttpResponse<(User & { followId: FollowId; isFollow: boolean })[]>
  > => {
    let followId = maxFollowId;

    if (!maxFollowId) {
      followId = isFollowing
        ? await followModel.getMaxIdByFollowing({ follower_id: targetUserId })
        : await followModel.getMaxIdByFollower({ following_id: targetUserId });

      if (!followId) {
        return { error: false, data: [] };
      }

      followId += 1;
    }

    if (!followId) {
      return { error: false, data: [] };
    }

    const followUserList = isFollowing
      ? await userModel.getFollowingUserList({
          id: targetUserId,
          maxFollowId: followId,
        })
      : await userModel.getFollowerUserList({
          id: targetUserId,
          maxFollowId: followId,
        });

    const promises = followUserList.map(
      async ({ id: otherUserId, nick, introduce, follow_id }) => {
        const isFollow = myUserId
          ? await followModel.getIsFollow({
              following_id: otherUserId,
              follower_id: myUserId,
            })
          : false;

        return {
          id: otherUserId,
          followId: follow_id,
          name: nick,
          introduce,
          isFollow,
        };
      },
    );

    const data = await Promise.all(promises);

    return {
      error: false,
      data: data.sort((a, b) => b.followId - a.followId),
    };
  },

  searchUsers: async ({
    name,
  }: Pick<User, 'name'>): Promise<HttpResponse<User[]>> => {
    const userList = await userModel.getUserListByName({ nick: name });

    return {
      error: false,
      data: userList.map(({ id, nick, introduce }) => ({
        id,
        introduce,
        name: nick,
      })),
    };
  },
};

export default userService;
