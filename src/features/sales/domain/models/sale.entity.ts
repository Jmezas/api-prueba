import { CustomerEntity } from 'src/features/customers/domain/models/customer.entity';
import { DocumentTypeEntity } from 'src/features/document-type/domain/models/document-type.entity';
import { SaleDetailEntity } from 'src/features/sale-details/domain/models/sale-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sales' })
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => SaleDetailEntity, (saleDetail) => saleDetail.sale, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  details: SaleDetailEntity[];

  @ManyToOne(() => CustomerEntity, (customer) => customer.sale, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => DocumentTypeEntity, (document) => document.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  @JoinColumn({ name: 'document_id' })
  documentType: DocumentTypeEntity;

  @Column({ type: 'int' })
  payment_condition: number | string;

  @Column({ type: 'date' })
  issue_date: Date;

  @Column({ type: 'date' })
  payment_date: Date;

  @Column({ type: 'varchar', length: 50 })
  serie: string;

  @Column({ type: 'int' })
  number: number;

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
  total_discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  global_discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'varchar', length: 50 })
  currency: string;

  @Column({ type: 'varchar', length: 2 })
  shipment_status: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
