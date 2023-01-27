import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { WarehouseModel } from '../../domain/models/warehouse.model';

const FilterFieldActiveInWarehouse = (ubigeo: WarehouseModel) => {
  const obj = Object.assign({}, ubigeo);
  delete obj.status;
  delete obj.created_at;
  delete obj.updated_at;
  return obj;
};

export class WarehouseDto extends DTOAbstract<WarehouseModel> {
  callback(result: Result<WarehouseModel>): Result<WarehouseModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInWarehouse);
    }
    return result;
  }
}
