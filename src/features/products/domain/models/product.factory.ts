import { url } from 'inspector';
import { ProductModel } from './product.model';

export interface IProduct {
  id: number;
  name: string;
  createdAt: Date;
  status: boolean;
  category: number;
  sub_category: number;
  unit: number;
  code: string;
  description: string;
  price_sale: number;
  price_purchase: number;
  discount: number;
  image: string[];
  url: string;
  price_cuarto: number;
  price_media: number;
  price_docena: number;
  price_caja: number;
  quantity_caja: number;

  operation_type: number;
  warehouse: number;
}
export class ProductFactory {
  create(product: Partial<IProduct>) {
    const id = product.id || 0;
    const name = product.name;
    const status = product.status || true;
    const createdAt = product.createdAt;
    const category = product.category;
    const sub_category = product.sub_category;
    const unit = product.unit;
    const code = product.code;
    const description = product.description;
    const price_sale = product.price_sale;
    const price_purchase = product.price_purchase;
    const discount = product.discount;
    const image = product.image;
    const operation_type = product.operation_type;
    const warehouse = product.warehouse;
    const url = product.url;
    const price_cuarto = product.price_cuarto;
    const price_media = product.price_media;
    const price_docena = product.price_docena;
    const price_caja = product.price_caja;
    const quantity_caja = product.quantity_caja;

    return new ProductModel(
      id,
      name,
      code,
      description,
      price_sale,
      price_purchase,
      discount,
      category,
      //  sub_category,
      unit,
      image,
      url,
      price_cuarto,
      price_media,
      price_docena,
      price_caja,
      quantity_caja,
      operation_type,
      warehouse,
      status,
      createdAt,
    );
  }
}
