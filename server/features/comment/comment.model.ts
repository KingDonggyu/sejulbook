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
  getCommentCount: async ({
    sejulbook_id,
  }: Pick<CommentEntity, 'sejulbook_id'>) => {
    const sql = `
      select count(${Column.ID}) as count 
      from ${TABLE_NAME}
      where ${Column.BOOKREVIEW_ID} = ${sejulbook_id}
    `;

    const [result] = await query<{ count: number }[]>(sql);
    return result.count;
  },

  getComments: async ({
    sejulbook_id,
  }: Pick<CommentEntity, 'sejulbook_id'>) => {
    const sql = `
      select *
      from ${TABLE_NAME}
      where ${Column.BOOKREVIEW_ID} = ${sejulbook_id}
    `;

    const result = await query<CommentEntity[]>(sql);
    return result;
  },

  deleteComments: async ({
    sejulbook_id,
  }: Pick<CommentEntity, 'sejulbook_id'>) => {
    const sql = `
      delete from ${TABLE_NAME} 
      where ${Column.BOOKREVIEW_ID} = ${sejulbook_id}
    `;
    await query(sql);
  },

  deleteAllCommentsByUser: async ({
    replyer_id,
  }: Pick<CommentEntity, 'replyer_id'>) => {
    const sql = `
      delete from ${TABLE_NAME}
      where ${Column.COMMENTER_ID} = ${replyer_id}
    `;
    await query(sql);
  },

  deleteSingleComment: async ({ id }: Pick<CommentEntity, 'id'>) => {
    const sql = `
      delete from ${TABLE_NAME}
      where ${Column.ID} = ${id}
    `;
    await query(sql);
  },

  createComments: async ({
    sejulbook_id,
    replyer_id,
    reply,
  }: Omit<CommentEntity, 'id' | 'replydate'>) => {
    const sql = `
      insert into ${TABLE_NAME} values (
        null, "${reply}", default, ${sejulbook_id}, ${replyer_id}
      )
    `;
    await query(sql);
  },

  updateComment: async ({ id, reply }: Pick<CommentEntity, 'id' | 'reply'>) => {
    const sql = `
      update ${TABLE_NAME}
      set ${Column.CONTENT} = "${reply}"
      where ${Column.ID} = ${id}
    `;
    await query(sql);
  },
};

export default commentModel;
