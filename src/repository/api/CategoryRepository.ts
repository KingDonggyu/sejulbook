import CategoryService from '@/server/services/category/category.service';

class CategoryRepository {
  private service = new CategoryService();

  get() {
    return this.service.findAll();
  }
}

export default CategoryRepository;
