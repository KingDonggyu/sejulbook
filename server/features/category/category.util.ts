import { HttpFailed } from 'server/types/http';

interface CategoryUtils {
  notFoundException: HttpFailed;
}

const categoryUtils: CategoryUtils = {
  notFoundException: {
    error: true,
    code: 404,
    message: '해당 카테고리가 존재하지 않습니다.',
  },
};

export default categoryUtils;
