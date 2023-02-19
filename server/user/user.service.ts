import UserDTO from './user.dto';
import UserModel from './user.model';

const UserService = {
  getUserId: async ({ sub }: Pick<UserDTO, 'sub'>) => {
    const result = await UserModel.getUserId({ sub });
    return result;
  },
};

export default UserService;
