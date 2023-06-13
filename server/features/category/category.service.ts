import { PrismaClient } from '@prisma/client';
import { HttpFailed, HttpResponse } from 'server/types/http';
import CategoryDto, { Id, Category as CategoryName } from './category.dto';

class CategoryService {
  private prisma: PrismaClient;

  private notFoundException: HttpFailed = {
    error: true,
    code: 404,
    message: '해당 카테고리가 존재하지 않습니다.',
  };

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

    return this.notFoundException;
  }

  async findId(categoryName: CategoryName): Promise<HttpResponse<Id>> {
    const category = await this.prisma.category.findFirst({
      where: { category: categoryName },
    });

    if (category !== null) {
      return { error: false, data: category.id };
    }

    return this.notFoundException;
  }
}

export default CategoryService;
