import query from 'server/database/query';
import { FollowId } from '../follow/follow.entity';
import {
  TABLE_NAME as FOLLOW_TABLE_NAME,
  Column as FollowColumn,
} from '../follow/follow.model';
import UserEntity from './user.entity';

type User = Pick<UserEntity, 'id' | 'nick' | 'introduce'>;

interface FollowUser extends User {
  follow_id: FollowId;
}

export const TABLE_NAME = 'user';

export enum Column {
  ID = 'id',
  SUB = 'sub',
  EMAIL = 'email',
  NICK = 'nick',
  GENDER = 'gender',
  AGE = 'age',
  JOINDATED = 'joindated',
  INTRODUCE = 'introduce',
}

const userModel = {
  getUserById: async ({ id }: Pick<UserEntity, 'id'>) => {
    const sql = `select * from ${TABLE_NAME} where ${Column.ID} = ${id};`;

    const result = await query<UserEntity[]>(sql);

    if (result.length) {
      return result[0];
    }

    return null;
  },

  getUserByName: async ({ nick }: Pick<UserEntity, 'nick'>) => {
    const sql = `select * from ${TABLE_NAME} where ${Column.NICK} = "${nick}";`;
    const result = await query<UserEntity[]>(sql);

    if (result.length) {
      return result[0];
    }

    return null;
  },

  getUserId: async ({ sub }: Pick<UserEntity, 'sub'>) => {
    const sql = `select ${Column.ID} from ${TABLE_NAME} where ${Column.SUB} = "${sub}";`;
    const result = await query<Pick<UserEntity, 'id'>[]>(sql);

    if (result.length) {
      return result[0].id;
    }

    return null;
  },

  getUserName: async ({ id }: Pick<UserEntity, 'id'>) => {
    const sql = `select ${Column.NICK} from ${TABLE_NAME} where ${Column.ID} = "${id}";`;
    const result = await query<Pick<UserEntity, 'nick'>[]>(sql);

    if (result.length) {
      return result[0].nick;
    }

    return null;
  },

  updateUser: async ({ id, nick, introduce }: User) => {
    const sql = `
      update ${TABLE_NAME} 
      set ${Column.NICK} = "${nick}", ${Column.INTRODUCE} = "${introduce}"
      where ${Column.ID} = ${id}
    `;
    await query(sql);
  },

  createUser: async (user: Omit<UserEntity, 'id'>) => {
    const sql = `insert into ${TABLE_NAME} (
      ${Column.EMAIL}, 
      ${Column.NICK}, 
      ${Column.GENDER}, 
      ${Column.AGE}, 
      ${Column.JOINDATED}, 
      ${Column.INTRODUCE}, 
      ${Column.SUB}
    ) values (
      "${user.email}", 
      "${user.nick}", 
      "${user.gender}", 
      "${user.age}", 
      default, 
      "${user.introduce}", 
      "${user.sub}"
    );`;

    await query(sql);
  },

  getFollowerUserList: async ({
    id,
    maxFollowId,
  }: Pick<UserEntity, 'id'> & {
    maxFollowId: FollowId;
  }) => {
    const sql = `
      select 
        F.${FollowColumn.ID} as follow_id, 
        U.${Column.ID}, 
        ${Column.NICK},
        ${Column.INTRODUCE}
      from ${TABLE_NAME} as U
        inner join ${FOLLOW_TABLE_NAME} as F
         on U.${Column.ID} = F.${FollowColumn.FOLLOWER_ID}
      where F.${FollowColumn.FOLLOWING_ID} = ${id} and F.${FollowColumn.ID} < ${maxFollowId}
      order by F.${FollowColumn.ID} desc
      limit 10;
    `;

    const result = await query<FollowUser[]>(sql);
    return result;
  },

  getFollowingUserList: async ({
    id,
    maxFollowId,
  }: Pick<UserEntity, 'id'> & {
    maxFollowId: FollowId;
  }) => {
    const sql = `
      select 
        F.${FollowColumn.ID} as follow_id, 
        U.${Column.ID}, 
        ${Column.NICK},
        ${Column.INTRODUCE}
      from ${TABLE_NAME} as U
        inner join ${FOLLOW_TABLE_NAME} as F
         on U.${Column.ID} = F.${FollowColumn.FOLLOWING_ID}
      where F.${FollowColumn.FOLLOWER_ID} = ${id} and F.${FollowColumn.ID} < ${maxFollowId}
      order by F.${FollowColumn.ID} desc
      limit 10;
    `;

    const result = await query<FollowUser[]>(sql);
    return result;
  },

  getUserListByName: async ({ nick }: Pick<User, 'nick'>) => {
    const sql = `
      select ${Column.ID}, ${Column.NICK}, ${Column.INTRODUCE}
      from ${TABLE_NAME}
      where 
        match(${Column.NICK})
        against("${nick}*" in boolean mode)
      order by 1 
      limit 10
    `;

    const result = await query<User[]>(sql);
    return result;
  },
};

export default userModel;
