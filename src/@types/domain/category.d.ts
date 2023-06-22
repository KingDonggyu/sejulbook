declare module 'category' {
  export type Id = number;
  export type Category = string;

  export interface GetCategoryResponse {
    id: Id;
    category: Category;
  }
}
