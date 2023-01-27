import { OperationTypeModel } from './operation_type.model';

export interface IOperationType {
  id: number;
  name: string;
  code: string;
  status: boolean;
}

export class OperationTypeFactory {
  create(operationType: Partial<IOperationType>) {
    const id = operationType.id || 0;
    const code = operationType.code;
    const name = operationType.name;
    const status = operationType.status || true;
    return new OperationTypeModel(id, name, code, status);
  }
}
