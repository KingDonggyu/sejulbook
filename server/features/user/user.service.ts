import { HttpSuccess, HttpFailed, HttpResponse } from 'server/types/http';
import { userError } from 'server/constants/message';
import UserDTO from './user.dto';
import userModel from './user.model';
import UserGuard from './user.guard';
import { FollowId } from '../follow/follow.dto';
import followModel from '../follow/follow.model';

type UserId = Pick<UserDTO, 'id'>;
type User = Pick<UserDTO, 'id' | 'name' | 'introduce'>;

interface FollowUser extends UserId {
  isFollowing: boolean;
  maxFollowId: FollowId | null;
}

const userService = {
  getUserId: async ({
    sub,
  }: Pick<UserDTO, 'sub'>): Promise<
    HttpSuccess<UserId | { id: null }> | HttpFailed
  > => {
    const result = await userModel.getUserId({ sub });

    return {
      error: false,
      data: { id: result },
    };
  },

  getUserById: async ({
    id,
  }: UserId): Promise<HttpSuccess<User> | HttpFailed> => {
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
  }: Pick<UserDTO, 'name'>): Promise<HttpSuccess<User | null> | HttpFailed> => {
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

  signUp: async (
    user: UserDTO,
  ): Promise<HttpSuccess<undefined> | HttpFailed> => {
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
    id,
    maxFollowId,
    isFollowing,
  }: FollowUser): Promise<
    HttpResponse<(User & { followId: FollowId; isFollow: boolean })[]>
  > => {
    let followId = maxFollowId;

    if (!maxFollowId) {
      followId = isFollowing
        ? await followModel.getMaxIdByFollowing({ follower_id: id })
        : await followModel.getMaxIdByFollower({ following_id: id });

      if (!followId) {
        return { error: false, data: [] };
      }

      followId += 1;
    }

    if (!followId) {
      return { error: false, data: [] };
    }

    const followUserList = isFollowing
      ? await userModel.getFollowingUserList({ id, maxFollowId: followId })
      : await userModel.getFollowerUserList({ id, maxFollowId: followId });

    if (isFollowing) {
      return {
        error: false,
        data: followUserList
          .map(({ id: userId, nick, introduce, follow_id }) => ({
            introduce,
            id: userId,
            name: nick,
            followId: follow_id,
            isFollow: true,
          }))
          .sort((a, b) => b.id - a.id),
      };
    }

    const promises = followUserList.map(
      async ({ id: userId, nick, introduce, follow_id }) => {
        const isFollow = await followModel.getIsFollow({
          following_id: id,
          follower_id: userId,
        });

        return {
          introduce,
          id: userId,
          name: nick,
          followId: follow_id,
          isFollow,
        };
      },
    );

    const data = await Promise.all(promises);

    return {
      error: false,
      data: data.sort((a, b) => b.id - a.id),
    };
  },
};

export default userService;
