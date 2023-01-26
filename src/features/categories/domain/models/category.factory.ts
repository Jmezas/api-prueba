import { CategoryModel } from './category.model';

export interface ICategory {
  id: number;
  name: string;
  createdAt: Date;
  status: boolean;
}
export class CategoryFactory {
  create(category: Partial<ICategory>) {
    const id = category.id || 0;
    const name = category.name;
    const status = category.status || true;
    const createdAt = category.createdAt;
    if (!name) {
      throw new Error('category name is required');
    }
    return new CategoryModel(id, name, status, createdAt);
  }
}
