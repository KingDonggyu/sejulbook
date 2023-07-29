import HttpClient from '@/lib/HttpClient';
import { CategoryService } from '@/server/services';

class CategoryRepository extends HttpClient {
  private service: CategoryService | null;

  private baseUrl = 'category';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new CategoryService() : null;
  }

  get(): ReturnType<CategoryService['findAll']> {
    if (this.service) {
      return this.service.findAll();
    }
    return this.axiosInstance(this.baseUrl);
  }
}

export default CategoryRepository;
