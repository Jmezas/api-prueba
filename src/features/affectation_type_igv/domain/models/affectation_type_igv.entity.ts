import { ProductEntity } from 'src/features/products/domain/models/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'affectation_type_igv' })
export class AffectationTypeIgvEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @OneToMany(() => ProductEntity, (product) => product.operation_type)
  product: ProductEntity[];

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
