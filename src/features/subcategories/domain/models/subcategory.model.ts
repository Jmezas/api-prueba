import { CategoryEntity } from 'src/features/categories/domain/models/category.entity';

export class SubcategoryModel {
  constructor(
    public id: number,
    public name: string,
    public status: boolean,
    public category: number | CategoryEntity,
    public createdAt: Date,
  ) {}
}
