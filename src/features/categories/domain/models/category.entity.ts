import { ProductEntity } from 'src/features/products/domain/models/product.entity';
import { SubcategoryEntity } from 'src/features/subcategories/domain/models/subcategory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => SubcategoryEntity, (sub) => sub.category)
  subCategory: SubcategoryEntity[];

  @OneToMany(() => ProductEntity, (sub) => sub.category)
  product: ProductEntity[];
}
