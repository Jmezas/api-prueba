import { WarehouseEntity } from 'src/features/warehouse/domain/models/warehouse.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'warehouse_stock' })
export class WarehouseStockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'int' })
  stock_min: number;

  @Column({ type: 'boolean' })
  notification: boolean;

  @ManyToOne(() => ProductEntity, (product) => product.warehouse, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => WarehouseEntity, (company) => company.warehouse, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: WarehouseEntity;
  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
