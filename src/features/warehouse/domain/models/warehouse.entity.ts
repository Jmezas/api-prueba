import { CompanyEntity } from 'src/features/company/domain/models/company.entity';
import { MovementEntity } from 'src/features/movement/domain/models/movement.entity';
import { WarehouseStockEntity } from 'src/features/products/domain/models/warehouse_stock.entity';
import { UbigeoEntity } from 'src/features/ubigeo/domain/models/ubigeo.entity';
import { UserEntity } from 'src/features/users/domain/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'warehouse' })
export class WarehouseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  departament: string;

  @Column({ type: 'varchar', length: 50 })
  province: string;

  @Column({ type: 'varchar', length: 50 })
  distrit: string;

  @ManyToOne(() => UbigeoEntity, (ubigeo) => ubigeo.warehouse, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'ubigeo_id' })
  ubigeo: UbigeoEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.warehouse, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToMany((type) => UserEntity, (user) => user.warehouses)
  users: UserEntity[];

  @OneToMany(() => WarehouseStockEntity, (warehouse) => warehouse.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  warehouse: WarehouseStockEntity[];

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
