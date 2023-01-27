import { MovementDetailEntity } from 'src/features/movement-detail/domain/models/movement-detail.entity';
import { OperationTypeModel } from 'src/features/operation_type/domain/models/operation_type.model';
import { WarehouseModel } from 'src/features/warehouse/domain/models/warehouse.model';
import { MovementModel } from './movement.model';

export interface IMovement {
  id: number;
  issue_date: Date;
  issue_date2: Date;
  serie: string;
  number: number;
  type: number;
  currency: string;
  quantity: number;
  recorded_operation: number;
  unaffected_operation: number;
  exempt_operation: number;
  free_operation: number;
  igv: number;
  total: number;
  observation: string;
  warehouse: number;
  operationType: number;
  details: MovementDetailEntity[];
}
export class MovementFactory {
  create(movement: Partial<IMovement>) {
    const id = movement.id || 0;
    const issue_date = movement.issue_date;
    const serie = movement.serie;
    const number = movement.number;
    const type = movement.type;
    const currency = movement.currency;
    const quantity = movement.quantity;
    const recorded_operation = movement.recorded_operation;
    const unaffected_operation = movement.unaffected_operation;
    const exempt_operation = movement.exempt_operation;
    const free_operation = movement.free_operation;
    const igv = movement.igv;
    const total = movement.total;
    const observation = movement.observation;
    const operationType = movement.operationType;
    const details = movement.details;
    const status = true;
    return new MovementModel(
      id,
      issue_date,
      serie,
      number,
      type,
      currency,
      quantity,
      recorded_operation,
      unaffected_operation,
      exempt_operation,
      free_operation,
      igv,
      total,
      observation,
      operationType,
      details,
      status,
    );
  }
}
