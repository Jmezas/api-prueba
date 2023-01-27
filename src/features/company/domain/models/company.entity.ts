import { WarehouseEntity } from 'src/features/warehouse/domain/models/warehouse.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'company' })
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  ruc: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 500 })
  web: string;

  @Column({ type: 'varchar', length: 5000, nullable: true })
  image: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => WarehouseEntity, (warehouse) => warehouse.company, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  warehouse: WarehouseEntity[];
}
