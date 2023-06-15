import { Category, Id } from '.';

export interface FindCategoryIdResponseDTO {
  id: Id;
}

export interface FindCategoryResponseDTO extends FindCategoryIdResponseDTO {
  category: Category;
}
