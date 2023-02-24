import { HttpSuccess, HttpFailed } from 'server/types/http';
import { userError } from 'server/constants/message';
import UserDTO from './user.dto';
import UserModel from './user.model';

type UserId = Pick<UserDTO, 'id'>;

const UserService = {
  getUserId: async ({
    sub,
  }: Pick<UserDTO, 'sub'>): Promise<HttpSuccess<UserId> | HttpFailed> => {
    const result = await UserModel.getUserId({ sub });

    return {
      error: false,
      data: { id: result },
    };
  },

  getUserByName: async ({
    name,
  }: Pick<UserDTO, 'name'>): Promise<
    HttpSuccess<UserDTO | null> | HttpFailed
  > => {
    const result = await UserModel.getUserByName({ nick: name });

    if (!result) {
      return {
        error: false,
        data: null,
      };
    }

    return {
      error: false,
      data: {
        ...result,
        name: result.nick,
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
      await UserModel.getUserByName({ nick: name }),
    );

    if (isDuplicateName) {
      return {
        error: true,
        code: 400,
        message: userError.DUPLICATE_NAME,
      };
    }

    await UserModel.createUser({ ...user, nick: name });

    return { error: false, data: undefined };
  },
};

export default UserService;
