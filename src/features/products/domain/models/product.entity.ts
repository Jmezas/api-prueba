import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UnitEntity } from 'src/features/unit/domain/models/unit.entity';
import { WarehouseStockEntity } from './warehouse_stock.entity';
import { AffectationTypeIgvEntity } from 'src/features/affectation_type_igv/domain/models/affectation_type_igv.entity';
import { CategoryEntity } from 'src/features/categories/domain/models/category.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price_sale: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price_purchase: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image: string[];

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string;

  //Lista de precios
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price_cuarto: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price_media: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price_docena: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price_caja: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  quantity_caja: number;
  //Lista de precios

  @ManyToOne(() => CategoryEntity, (category) => category.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  // @ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.product, {
  //   onDelete: 'RESTRICT',
  //   onUpdate: 'RESTRICT',
  //   eager: true,
  // })
  // @JoinColumn({ name: 'sub_category_id' })
  // sub_category: SubcategoryEntity;

  @ManyToOne(() => UnitEntity, (unit) => unit.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'unit_id' })
  unit: UnitEntity;

  @ManyToOne(() => AffectationTypeIgvEntity, (operation) => operation.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'operation_id' })
  operation_type;

  @OneToMany(() => WarehouseStockEntity, (warehouse) => warehouse.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  warehouse: WarehouseStockEntity[];

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
