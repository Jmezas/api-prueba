import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { UnitModel } from '../../domain/models/unit.model';

const FilterFieldActiveInUnit = (ubigeo: UnitModel) => {
  const obj = Object.assign({}, ubigeo);
  return obj;
};

export class UnitDto extends DTOAbstract<UnitModel> {
  callback(result: Result<UnitModel>): Result<UnitModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInUnit);
    }
    return result;
  }
}
