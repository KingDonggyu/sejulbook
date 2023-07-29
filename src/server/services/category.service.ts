import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@/server/exceptions';
import type { Category, GetCategoryResponse, Id } from 'category';

class CategoryService {
  private categoryRepository = new PrismaClient().category;

  private notFoundMessage = '해당 카테고리가 존재하지 않습니다.';

  async findAll(): Promise<GetCategoryResponse[]> {
    const categories = await this.categoryRepository.findMany();
    return categories.slice(1);
  }

  async findById(id: Id): Promise<GetCategoryResponse> {
    const category = await this.categoryRepository.findUnique({
      where: { id },
    });

    if (category !== null) {
      return category;
    }

    throw new NotFoundException(this.notFoundMessage);
  }

  async findId(categoryName: Category) {
    const category = await this.categoryRepository.findFirst({
      where: { category: categoryName },
    });

    if (category !== null) {
      return { id: category.id };
    }

    throw new NotFoundException(this.notFoundMessage);
  }
}

export default CategoryService;
