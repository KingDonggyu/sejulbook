import query from 'server/database/query';
import TagEntity from './tag.entity';

const TABLE_NAME = 'tag';

enum Column {
  TAG = 'tag',
  BOOKREVIEW_ID = 'sejulbook_id',
}

const tagModel = {
  getTags: async ({ sejulbook_id }: Pick<TagEntity, 'sejulbook_id'>) => {
    const sql = `
      select ${Column.TAG} 
      from ${TABLE_NAME} 
      where ${Column.BOOKREVIEW_ID} = ${sejulbook_id}
    `;

    const result = await query<Pick<TagEntity, 'tag'>[]>(sql);
    return result;
  },

  createTags: async (tags: Omit<TagEntity, 'id'>) => {
    const sql = `insert into ${TABLE_NAME} values (
      null,
      "${tags.tag}",
      ${tags.sejulbook_id}
    )`;

    await query(sql);
  },
};

export default tagModel;
