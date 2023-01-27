import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { SaleDetailModel } from '../../domain/models/sale-detail.model';

const FilterFieldActiveInDetail = (Detail: SaleDetailModel) => {
  const obj = Object.assign({}, Detail);
  delete obj.status;
  return obj;
};

export class SaleDetailDto extends DTOAbstract<SaleDetailModel> {
  callback(result: Result<SaleDetailModel>): Result<SaleDetailModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInDetail);
    } else {
      delete (result.payload.data as SaleDetailModel).status;
    }
    return result;
  }
}
