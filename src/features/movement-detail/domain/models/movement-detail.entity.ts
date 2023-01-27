import { MovementEntity } from 'src/features/movement/domain/models/movement.entity';
import { ProductEntity } from 'src/features/products/domain/models/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'movement_detail' })
export class MovementDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  unit: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  igv: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @ManyToOne(() => MovementEntity, (movement) => movement.details, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'movement_id' })
  movement: MovementEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
