import HttpClient from '@/lib/HttpClient';
import { CategoryService } from '@/server/services';

class CategoryRepository extends HttpClient {
  private service: CategoryService | null;

  private baseUrl = 'category';

  constructor() {
    super();
    this.service = this.checkIsSSR() ? new CategoryService() : null;
  }

  httpGet(): ReturnType<CategoryService['findAll']> {
    if (this.service) {
      return this.service.findAll();
    }
    return this.getRequest(this.baseUrl);
  }
}

export default CategoryRepository;
