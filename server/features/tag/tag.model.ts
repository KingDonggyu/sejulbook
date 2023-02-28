import query from 'server/database/query';
import TagEntity from './tag.entity';

const TABLE_NAME = 'tag';

const tagModel = {
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
