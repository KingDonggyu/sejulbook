import query from 'server/database/query';
import { FollowEntity } from './follow.entity';

const TABLE_NAME = 'follow';

enum Column {
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

  getFollowerCount: async ({
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
};

export default followModel;
