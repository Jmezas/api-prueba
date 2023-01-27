import { ProductEntity } from 'src/features/products/domain/models/product.entity';
import { SaleEntity } from 'src/features/sales/domain/models/sale.entity';

export class SaleDetailModel {
  constructor(
    public id: number,
    public unit: string,
    public quantity: number,
    public price: number,
    public igv: number,
    public total: number,
    public discount: number,
    public code_type: string,
    public code_igv: number,
    public sale: SaleEntity,
    public product: ProductEntity,
    public status: boolean,
    public createdAt: Date,
  ) {}
}
