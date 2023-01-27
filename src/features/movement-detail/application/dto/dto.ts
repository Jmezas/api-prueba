import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { MovementDetailModel } from '../../domain/models/movement-detail.model';

const FilterFieldActiveInDetail = (Detail: MovementDetailModel) => {
  const obj = Object.assign({}, Detail);
  delete obj.status;
  return obj;
};

export class MovementDetailDto extends DTOAbstract<MovementDetailModel> {
  callback(result: Result<MovementDetailModel>): Result<MovementDetailModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInDetail);
    } else {
      delete (result.payload.data as MovementDetailModel).status;
    }
    return result;
  }
}
