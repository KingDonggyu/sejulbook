import query from 'server/database/query';
import UserEntity from './user.entity';

const TABLE_NAME = 'user';

enum Column {
  ID = 'id',
  SUB = 'sub',
  EMAIL = 'email',
  NICK = 'nick',
  GENDER = 'gender',
  AGE = 'age',
  JOINDATED = 'joindated',
  INTRODUCE = 'introduce',
}

const UserModel = {
  getUser: async ({ id }: Pick<UserEntity, 'id'>) => {
    const sql = `select * from ${TABLE_NAME} where ${Column.ID} = ${id};`;
    const result = await query<UserEntity>(sql);

    if (result.length) {
      return result[0];
    }

    return null;
  },

  getUserId: async ({ sub }: Pick<UserEntity, 'sub'>) => {
    const sql = `select ${Column.ID} from ${TABLE_NAME} where ${Column.SUB} = "${sub}";`;
    const result = await query<number>(sql);

    if (result.length) {
      return result[0];
    }

    return null;
  },

  insertUser: async (user: UserEntity) => {
    const sql = `insert into ${TABLE_NAME} (
      ${Column.ID}, 
      ${Column.EMAIL}, 
      ${Column.NICK}, 
      ${Column.GENDER}, 
      ${Column.AGE}, 
      ${Column.JOINDATED}, 
      ${Column.INTRODUCE}, 
      ${Column.SUB}
    ) values (
      ${user.id}, 
      "${user.email}", 
      "${user.nick}", 
      "${user.gender}", 
      "${user.age}", 
      default, 
      "${user.intoroduce}", 
      "${user.sub}"
    );`;

    await query(sql);
  },
};

export default UserModel;
