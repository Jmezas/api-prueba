import { CustomerEntity } from 'src/features/customers/domain/models/customer.entity';
import { ProductEntity } from 'src/features/products/domain/models/product.entity';
import { SaleEntity } from 'src/features/sales/domain/models/sale.entity';
import { AuditEntity } from 'src/features/shared/domain/models/audit.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'general' })
export class GeneralEntity extends AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  parentcode: number;

  @Column({ type: 'integer' })
  code: number;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  description2: string;
}
