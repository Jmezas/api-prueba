import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { CompanyModel } from '../../domain/models/company.model';

const FilterFieldActiveInCompany = (company: CompanyModel) => {
  const obj = Object.assign({}, company);

  return obj;
};

export class CategoryDto extends DTOAbstract<CompanyModel> {
  callback(result: Result<CompanyModel>): Result<CompanyModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInCompany);
    } else {
    }
    return result;
  }
}
