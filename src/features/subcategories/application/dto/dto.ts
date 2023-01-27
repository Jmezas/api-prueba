import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { SubcategoryModel } from '../../domain/models/subcategory.model';

const FilterFieldActiveInSubCategory = (sale: SubcategoryModel) => {
  const obj = Object.assign({}, sale);
  delete obj.status;
  return obj;
};

export class SubcategoryDto extends DTOAbstract<SubcategoryModel> {
  callback(result: Result<SubcategoryModel>): Result<SubcategoryModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInSubCategory);
    } else {
      delete (result.payload.data as SubcategoryModel).status;
    }
    return result;
  }
}
