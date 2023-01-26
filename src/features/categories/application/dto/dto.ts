import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { CategoryModel } from '../../domain/models/category.model';

const FilterFieldActiveInCategory = (category: CategoryModel) => {
  const obj = Object.assign({}, category);
  delete obj.status;
  delete obj.createdAt;
  return obj;
};

export class CategoryDto extends DTOAbstract<CategoryModel> {
  callback(result: Result<CategoryModel>): Result<CategoryModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInCategory);
    } else {
      delete (result.payload.data as CategoryModel).status;
      delete (result.payload.data as CategoryModel).createdAt;
    }
    return result;
  }
}
