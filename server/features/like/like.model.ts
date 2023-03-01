import query from 'server/database/query';
import LikeEntity from './like.entity';

const TABLE_NAME = 'likes';

enum Column {
  ID = 'id',
  BOOKREVIEW_ID = 'sejulbook_id',
  LIKER_ID = 'liker_id',
}

const likeModel = {
  getLikeCountByBookReview: async ({
    sejulbook_id,
  }: Pick<LikeEntity, 'sejulbook_id'>) => {
    const sql = `
      select count(${Column.ID}) as count
      from ${TABLE_NAME}
      where ${Column.BOOKREVIEW_ID} = ${sejulbook_id}
    `;

    const [result] = await query<{ count: number }[]>(sql);
    return result;
  },
};

export default likeModel;
