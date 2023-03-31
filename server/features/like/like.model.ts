import query from 'server/database/query';
import LikeEntity from './like.entity';

export const TABLE_NAME = 'likes';

export enum Column {
  ID = 'id',
  BOOKREVIEW_ID = 'sejulbook_id',
  LIKER_ID = 'liker_id',
}

const likeModel = {
  getLike: async ({ sejulbook_id, liker_id }: LikeEntity) => {
    const sql = `
      select * from ${TABLE_NAME} where 
      ${Column.BOOKREVIEW_ID} = ${sejulbook_id} and  
      ${Column.LIKER_ID} = ${liker_id}
    `;

    const result = await query<LikeEntity[]>(sql);
    return result;
  },

  getLikeCount: async ({ sejulbook_id }: Pick<LikeEntity, 'sejulbook_id'>) => {
    const sql = `
      select count(${Column.ID}) as count
      from ${TABLE_NAME}
      where ${Column.BOOKREVIEW_ID} = ${sejulbook_id}
    `;

    const [result] = await query<{ count: number }[]>(sql);
    return result.count;
  },

  deleteAllLikes: async ({
    sejulbook_id,
  }: Pick<LikeEntity, 'sejulbook_id'>) => {
    const sql = `
      delete from ${TABLE_NAME} 
      where ${Column.BOOKREVIEW_ID} = ${sejulbook_id}
    `;
    await query(sql);
  },

  createLike: async ({ sejulbook_id, liker_id }: LikeEntity) => {
    const sql = `
      insert into ${TABLE_NAME} 
      values (null, ${sejulbook_id}, ${liker_id})
    `;
    await query(sql);
  },

  deleteLike: async ({ sejulbook_id, liker_id }: LikeEntity) => {
    const sql = `
      delete from ${TABLE_NAME} where 
      ${Column.BOOKREVIEW_ID} = ${sejulbook_id} and ${Column.LIKER_ID} = ${liker_id}
    `;
    await query(sql);
  },
};

export default likeModel;
