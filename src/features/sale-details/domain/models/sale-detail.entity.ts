import { ProductEntity } from 'src/features/products/domain/models/product.entity';
import { SaleEntity } from 'src/features/sales/domain/models/sale.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'detail' })
export class SaleDetailEntity {
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

  @Column({ type: 'varchar', length: 50 })
  code_type: string;

  @Column({ type: 'int' })
  code_igv: number;

  @ManyToOne(() => SaleEntity, (sale) => sale.details, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'sale_id' })
  sale: SaleEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
