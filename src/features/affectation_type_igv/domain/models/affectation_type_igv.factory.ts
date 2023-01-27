import { AffectationTypeIgvModel } from './affectation_type_igv.model';

export interface IAffectationTypeIgv {
  id: number;
  name: string;
  code: string;
}

export class AffectationTypeIgvFactory {
  create(obj: Partial<IAffectationTypeIgv>) {
    const id = obj.id;
    const name = obj.name;
    const code = obj.code;
    const status = true;
    return new AffectationTypeIgvModel(id, name, code, status);
  }
}
