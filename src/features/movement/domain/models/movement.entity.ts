import { MovementDetailEntity } from 'src/features/movement-detail/domain/models/movement-detail.entity';
import { OperationTypeEntity } from 'src/features/operation_type/domain/models/operation_type.entity';
import { WarehouseEntity } from 'src/features/warehouse/domain/models/warehouse.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'movement' })
export class MovementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  issue_date: Date;

  @Column({ type: 'varchar', length: 50 })
  serie: string;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'int' })
  type: number | string;

  @Column({ type: 'varchar', length: 50 })
  currency: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  recorded_operation: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unaffected_operation: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  exempt_operation: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  free_operation: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  igv: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  observation: string;

  @ManyToOne(() => OperationTypeEntity, (general) => general.movement, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'operationType_id' })
  operationType: OperationTypeEntity;

  @OneToMany(() => MovementDetailEntity, (detail) => detail.movement, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  details: MovementDetailEntity[];

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
