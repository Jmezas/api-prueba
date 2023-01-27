import { ProductEntity } from 'src/features/products/domain/models/product.entity';
import { SaleEntity } from 'src/features/sales/domain/models/sale.entity';
import { SaleDetailModel } from './sale-detail.model';

export interface IDetail {
  id: number;
  unit: string;
  amount: number;
  price: number;
  igv: number;
  total: number;
  discount: number;
  code_type: string;
  code_igv: number;
  createdAt: Date;
  status: boolean;
  sale: SaleEntity;
  product: ProductEntity;
}
export class SaleDetailFactory {
  create(detail: Partial<IDetail>) {
    const id = detail.id || 0;
    const unit = detail.unit;
    const amount = detail.amount;
    const price = detail.price;
    const igv = detail.igv;
    const total = detail.total;
    const discount = detail.discount;
    const code_type = detail.code_type;
    const code_igv = detail.code_igv;
    const status = detail.status || true;
    const createdAt = detail.createdAt;
    const sale = detail.sale;
    const product = detail.product;

    return new SaleDetailModel(
      id,
      unit,
      amount,
      price,
      igv,
      total,
      discount,
      code_type,
      code_igv,
      sale,
      product,
      status,
      createdAt,
    );
  }
}
