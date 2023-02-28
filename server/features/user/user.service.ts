import { HttpSuccess, HttpFailed } from 'server/types/http';
import { userError } from 'server/constants/message';
import UserDTO from './user.dto';
import userModel from './user.model';

type UserId = Pick<UserDTO, 'id'>;
type User = Pick<UserDTO, 'id' | 'name' | 'introduce'>;

const userService = {
  getUserId: async ({
    sub,
  }: Pick<UserDTO, 'sub'>): Promise<HttpSuccess<UserId> | HttpFailed> => {
    const result = await userModel.getUserId({ sub });

    return {
      error: false,
      data: { id: result },
    };
  },

  getUserById: async ({
    id,
  }: UserId): Promise<HttpSuccess<User> | HttpFailed> => {
    if (id === null) {
      return {
        error: true,
        code: 404,
        message: userError.USER_NOT_FOUND,
      };
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

  signUp: async (
    user: UserDTO,
  ): Promise<HttpSuccess<undefined> | HttpFailed> => {
    if (!user.name) {
      return {
        error: true,
        code: 400,
        message: userError.EMPTY_NAME,
      };
    }

    const name = user.name.toLowerCase();

    if (name.length < 2 || name.length > 10) {
      return {
        error: true,
        code: 400,
        message: userError.LIMIT_REACHED_NAME,
      };
    }

    if (!/^[가-힣|a-z|0-9|]+$/.test(name)) {
      return {
        error: true,
        code: 400,
        message: userError.NOT_MATCHED_PATTERN_NAME,
      };
    }

    const isDuplicateName = Boolean(
      await userModel.getUserByName({ nick: name }),
    );

    if (isDuplicateName) {
      return {
        error: true,
        code: 400,
        message: userError.DUPLICATE_NAME,
      };
    }

    await userModel.createUser({ ...user, nick: name });

    return { error: false, data: undefined };
  },
};

export default userService;
