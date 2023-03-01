import query from 'server/database/query';
import CategoryEntity from './category.entity';

const TABLE_NAME = 'category';

const categoryModel = {
  getCategories: async () => {
    const sql = `select * from ${TABLE_NAME}`;
    const result = await query<CategoryEntity[]>(sql);

    return result;
  },
};

export default categoryModel;
