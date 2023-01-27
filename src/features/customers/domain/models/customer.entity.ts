import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UbigeoEntity } from 'src/features/ubigeo/domain/models/ubigeo.entity';
import { SaleEntity } from 'src/features/sales/domain/models/sale.entity';

@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  nroDocumento: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 1000 })
  address: string;

  @OneToMany(() => SaleEntity, (sale) => sale.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  sale: SaleEntity[];

  @Column({ type: 'int' })
  document: number | string;

  @Column({ type: 'varchar', length: 50 })
  departament: string;

  @Column({ type: 'varchar', length: 50 })
  province: string;

  @Column({ type: 'varchar', length: 50 })
  distrit: string;

  @ManyToOne(() => UbigeoEntity, (ubigeo) => ubigeo.customer, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'ubigeo_id' })
  ubigeo: UbigeoEntity;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
