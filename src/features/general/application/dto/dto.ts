import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { GeneralModel } from '../../domain/models/general.model';

const FilterFieldActiveInCustomer = (Customer: GeneralModel) => {
  const obj = Object.assign({}, Customer);
  delete obj.status;
  return obj;
};

export class CustomerDto extends DTOAbstract<GeneralModel> {
  callback(result: Result<GeneralModel>): Result<GeneralModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInCustomer);
    } else {
      delete (result.payload.data as GeneralModel).status;
    }
    return result;
  }
}
