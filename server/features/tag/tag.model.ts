import query from 'server/database/query';
import TagEntity from './tag.entity';

interface SearchedTag extends Pick<TagEntity, 'tag'> {
  count: number;
}

export const TABLE_NAME = 'tag';

export enum Column {
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

  deleteTags: async ({ sejulbook_id }: Pick<TagEntity, 'sejulbook_id'>) => {
    const sql = `
      delete from ${TABLE_NAME} 
      where ${Column.BOOKREVIEW_ID} = ${sejulbook_id}
    `;

    await query(sql);
  },

  getSearchedTags: async ({ tag }: Pick<TagEntity, 'tag'>) => {
    const sql = `
      select ${Column.TAG}, count(${Column.TAG}) as count
      from ${TABLE_NAME} 
      where 
        match(${Column.TAG}) against("${tag}*" in boolean mode) 
      group by ${TABLE_NAME} 
      order by 1 limit 10;
    `;

    const result = await query<SearchedTag[]>(sql);
    return result;
  },

  getMaxBookReviewIdByTag: async ({ tag }: Pick<TagEntity, 'tag'>) => {
    const sql = `
      select max(${Column.BOOKREVIEW_ID}) as id
      from ${TABLE_NAME}
      where ${Column.TAG} = "${tag}"
    `;

    const result = await query<Pick<TagEntity, 'id'>[]>(sql);
    return result.length ? result[0].id : null;
  },
};

export default tagModel;
