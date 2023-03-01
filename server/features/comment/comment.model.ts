import query from 'server/database/query';
import CommentEntity from './comment.entity';

const TABLE_NAME = 'reply';

enum Column {
  ID = 'id',
  BOOKREVIEW_ID = 'sejulbook_id',
  COMMENTER_ID = 'replyer_id',
  CONTENT = 'reply',
}

const commentModel = {
  getCommentCountByBookReview: async ({
    sejulbook_id,
  }: Pick<CommentEntity, 'sejulbook_id'>) => {
    const sql = `
      select count(${Column.ID}) as count 
      from ${TABLE_NAME}
      where ${Column.BOOKREVIEW_ID} = ${sejulbook_id}
    `;

    const [result] = await query<{ count: number }[]>(sql);
    return result;
  },
};

export default commentModel;
