import query from 'server/database/query';
import CategoryEntity from './category.entity';

const TABLE_NAME = 'category';

enum Column {
  ID = 'id',
  CATEGORY = 'category',
}

const categoryModel = {
  getCategories: async () => {
    const sql = `select * from ${TABLE_NAME} where ${Column.ID} > 1`;
    const result = await query<CategoryEntity[]>(sql);
    return result;
  },

  getCategory: async ({ id }: Pick<CategoryEntity, 'id'>) => {
    const sql = `
      select ${Column.CATEGORY} 
      from ${TABLE_NAME} 
      where ${Column.ID} = ${id}
    `;

    const [result] = await query<Pick<CategoryEntity, 'category'>[]>(sql);
    return result;
  },
};

export default categoryModel;
