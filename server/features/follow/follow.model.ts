import query from 'server/database/query';
import { FollowEntity } from './follow.entity';
import { UserId } from '../user/user.entity';

export const TABLE_NAME = 'follow';

export enum Column {
  ID = 'id',
  FOLLOWER_ID = 'follower_id',
  FOLLOWING_ID = 'following_id',
}

const followModel = {
  getIsFollow: async ({
    following_id,
    follower_id,
  }: Omit<FollowEntity, 'id'>) => {
    const sql = `
      select * from ${TABLE_NAME} where 
      ${Column.FOLLOWER_ID} = ${follower_id} and 
      ${Column.FOLLOWING_ID} = ${following_id}
    `;

    const result = await query<FollowEntity[]>(sql);
    return !!result.length;
  },

  getFollowingCount: async ({
    follower_id,
  }: Pick<FollowEntity, 'follower_id'>) => {
    const sql = `
      select count(${Column.FOLLOWING_ID}) as count 
      from ${TABLE_NAME}
      where ${Column.FOLLOWER_ID} = ${follower_id}
    `;

    const [result] = await query<{ count: number }[]>(sql);
    return result.count;
  },

  getFollowerCount: async ({
    following_id,
  }: Pick<FollowEntity, 'following_id'>) => {
    const sql = `
      select count(${Column.FOLLOWER_ID}) as count 
      from ${TABLE_NAME}
      where ${Column.FOLLOWING_ID} = ${following_id}
    `;

    const [result] = await query<{ count: number }[]>(sql);
    return result.count;
  },

  getMaxIdByFollowing: async ({
    follower_id,
  }: Pick<FollowEntity, 'follower_id'>) => {
    const sql = `
      select max(${Column.ID}) as id
      from ${TABLE_NAME}
      where ${Column.FOLLOWER_ID} = ${follower_id}
    `;

    const result = await query<Pick<FollowEntity, 'id'>[]>(sql);
    return result.length ? result[0].id : null;
  },

  getMaxIdByFollower: async ({
    following_id,
  }: Pick<FollowEntity, 'following_id'>) => {
    const sql = `
      select max(${Column.ID}) as id 
      from ${TABLE_NAME}
      where ${Column.FOLLOWING_ID} = ${following_id}
    `;

    const result = await query<Pick<FollowEntity, 'id'>[]>(sql);
    return result.length ? result[0].id : null;
  },

  createFollow: async ({
    follower_id,
    following_id,
  }: Omit<FollowEntity, 'id'>) => {
    const sql = `
      insert into ${TABLE_NAME} values
      (null, ${follower_id}, ${following_id})
    `;

    await query(sql);
  },

  deleteFollow: async ({
    follower_id,
    following_id,
  }: Omit<FollowEntity, 'id'>) => {
    const sql = `
    delete from ${TABLE_NAME} where
    ${Column.FOLLOWER_ID} = ${follower_id} and
    ${Column.FOLLOWING_ID} = ${following_id}
  `;

    await query(sql);
  },

  deleteAllFollowByUser: async ({ userId }: { userId: UserId }) => {
    const sql = `
      delete from ${TABLE_NAME} where
      ${Column.FOLLOWER_ID} = ${userId} or
      ${Column.FOLLOWING_ID} = ${userId}
    `;

    await query(sql);
  },
};

export default followModel;
