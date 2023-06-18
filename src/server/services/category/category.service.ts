import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@/server/exceptions';
import { Id, Category } from './dto';
import {
  FindCategoryResponseDTO,
  FindCategoryIdResponseDTO,
} from './dto/find-category.dto';

class CategoryService {
  private category = new PrismaClient().category;

  private notFoundMessage = '해당 카테고리가 존재하지 않습니다.';

  async findAll(): Promise<FindCategoryResponseDTO[]> {
    return this.category.findMany();
  }

  async findById(id: Id): Promise<FindCategoryResponseDTO> {
    const category = await this.category.findUnique({ where: { id } });

    if (category !== null) {
      return category;
    }

    throw new NotFoundException(this.notFoundMessage);
  }

  async findId(categoryName: Category): Promise<FindCategoryIdResponseDTO> {
    const category = await this.category.findFirst({
      where: { category: categoryName },
    });

    if (category !== null) {
      return { id: category.id };
    }

    throw new NotFoundException(this.notFoundMessage);
  }
}

export default CategoryService;
