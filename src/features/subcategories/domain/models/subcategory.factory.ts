import { SubcategoryModel } from './subcategory.model';

export interface ISubcategory {
  id: number;
  name: string;
  createdAt: Date;
  category: number;
  status: boolean;
}
export class SubcategoryFactory {
  create(obj: Partial<ISubcategory>) {
    const id = obj.id || 0;
    const name = obj.name;
    const status = obj.status || true;
    const category = obj.category;
    const createdAt = obj.createdAt;
    if (!name) {
      throw new Error('Sale name is required');
    }
    return new SubcategoryModel(id, name, status, category, createdAt);
  }
}
