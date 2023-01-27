import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { UbigeoModel } from '../../domain/models/ubigeo.model';

const FilterFieldActiveInUbigeo = (ubigeo: UbigeoModel) => {
  const obj = Object.assign({}, ubigeo);
  return obj;
};

export class UbigeoDto extends DTOAbstract<UbigeoModel> {
  callback(result: Result<UbigeoModel>): Result<UbigeoModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInUbigeo);
    }
    return result;
  }
}
