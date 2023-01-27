import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WarehouseEntity } from 'src/features/warehouse/domain/models/warehouse.entity';
import { CustomerEntity } from 'src/features/customers/domain/models/customer.entity';

@Entity({ name: 'ubigeo' })
export class UbigeoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  department: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  province: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string;

  @OneToMany(() => CustomerEntity, (customer) => customer.ubigeo, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  customer: CustomerEntity[];

  @OneToMany(() => WarehouseEntity, (warehouse) => warehouse.ubigeo, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  warehouse: WarehouseEntity[];
}
