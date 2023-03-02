import { HttpSuccess, HttpFailed } from 'server/types/http';
import CategoryDTO from './category.dto';
import categoryModel from './category.model';

const categoryService = {
  getCategories: async (): Promise<HttpSuccess<CategoryDTO[]> | HttpFailed> => {
    const result = await categoryModel.getCategories();

    return {
      error: false,
      data: result,
    };
  },
};

export default categoryService;
