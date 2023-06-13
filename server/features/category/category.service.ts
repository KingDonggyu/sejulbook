import { PrismaClient } from '@prisma/client';
import { HttpResponse } from 'server/types/http';
import CategoryDto, { Id, Category as CategoryName } from './category.dto';
import categoryUtils from './category.util';

class CategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<HttpResponse<CategoryDto[]>> {
    const categories = await this.prisma.category.findMany();
    return { error: false, data: categories };
  }

  async findById(id: Id): Promise<HttpResponse<CategoryDto>> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (category !== null) {
      return { error: false, data: category };
    }

    return categoryUtils.notFoundException;
  }

  async findId(categoryName: CategoryName): Promise<HttpResponse<Id>> {
    const category = await this.prisma.category.findFirst({
      where: { category: categoryName },
    });

    if (category !== null) {
      return { error: false, data: category.id };
    }

    return categoryUtils.notFoundException;
  }
}

export default CategoryService;
