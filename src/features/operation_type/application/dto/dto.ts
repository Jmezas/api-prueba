import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { OperationTypeModel } from '../../domain/models/operation_type.model';

const FilterFieldActiveInDetail = (Detail: OperationTypeModel) => {
  const obj = Object.assign({}, Detail);
  delete obj.status;
  return obj;
};

export class OperationTypeDto extends DTOAbstract<OperationTypeModel> {
  callback(result: Result<OperationTypeModel>): Result<OperationTypeModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInDetail);
    } else {
      delete (result.payload.data as OperationTypeModel).status;
    }
    return result;
  }
}
