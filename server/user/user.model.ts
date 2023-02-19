import query from 'server/database/query';
import UserEntity from './user.entity';

enum User {
  TABLE_NAME = 'user',
  ID = 'id',
  SUB = 'sub',
}

const UserModel = {
  getUser: async ({ id }: Pick<UserEntity, 'id'>) => {
    const sql = `SELECT * FROM ${User.TABLE_NAME} WHERE id = ${id};`;
    const result = await query<UserEntity>(sql);

    if (result.length) {
      return result[0];
    }

    return null;
  },

  getUserId: async ({ sub }: Pick<UserEntity, 'sub'>) => {
    const sql = `SELECT ${User.ID} FROM ${User.TABLE_NAME} WHERE ${User.SUB} = ${sub};`;
    const result = await query<number>(sql);

    if (result.length) {
      return result[0];
    }

    return null;
  },
};

export default UserModel;
