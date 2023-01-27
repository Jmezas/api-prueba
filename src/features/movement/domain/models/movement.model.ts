import { MovementDetailEntity } from 'src/features/movement-detail/domain/models/movement-detail.entity';
import { OperationTypeEntity } from 'src/features/operation_type/domain/models/operation_type.entity';
import { WarehouseEntity } from 'src/features/warehouse/domain/models/warehouse.entity';
export class MovementModel {
  constructor(
    public id: number,
    public issue_date: Date,
    public serie: string,
    public number: number,
    public type: number | string,
    public currency: string,
    public quantity: number,
    public recorded_operation: number,
    public unaffected_operation: number,
    public exempt_operation: number,
    public free_operation: number,
    public igv: number,
    public total: number,
    public observation: string,
    public operationType: number | OperationTypeEntity,
    public details: MovementDetailEntity[],
    public status: boolean,
  ) {}
}
