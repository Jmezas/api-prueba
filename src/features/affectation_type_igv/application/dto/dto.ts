import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { AffectationTypeIgvModel } from '../../domain/models/affectation_type_igv.model';

const FilterFieldActiveInAffectationTypeIgv = (
  category: AffectationTypeIgvModel,
) => {
  const obj = Object.assign({}, category);
  delete obj.status;
  return obj;
};

export class AffectationTypeIgvDto extends DTOAbstract<AffectationTypeIgvModel> {
  callback(
    result: Result<AffectationTypeIgvModel>,
  ): Result<AffectationTypeIgvModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInAffectationTypeIgv);
    } else {
      delete (result.payload.data as AffectationTypeIgvModel).status;
    }
    return result;
  }
}
