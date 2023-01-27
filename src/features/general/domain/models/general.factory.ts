import { GeneralModel } from './general.model';

export interface IGeneral {
  id: number;
  parentcode: number;
  code: number;
  description: string;
  description2: string;
  createdAt: Date;
  status: boolean;
}
export class GeneralFactory {
  create(customer: Partial<IGeneral>) {
    const id = customer.id || 0;
    const parentcode = customer.parentcode || 0;
    const code = customer.code || 0;
    const description = customer.description;
    const description2 = customer.description2;
    const status = customer.status || true;
    const createdAt = customer.createdAt;
    return new GeneralModel(
      id,
      parentcode,
      code,
      description,
      description2,
      status,
      createdAt,
    );
  }
}
