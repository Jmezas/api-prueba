import { MovementDetailModel } from './movement-detail.model';

export interface IMovementDetail {
  id: number;
  unit: string;
  quantity: number;
  price: number;
  discount: number;
  igv: number;
  total: number;
  movement: number;
  product: number;
  status: boolean;
}

export class MovementDetailFactory {
  create(detail: Partial<IMovementDetail>) {
    const id = detail.id || 0;
    const unit = detail.unit;
    const quantity = detail.quantity;
    const price = detail.price;
    const discount = detail.discount;
    const igv = detail.igv;
    const total = detail.total;
    const movement = detail.movement;
    const product = detail.product;
    const status = detail.status || true;

    return new MovementDetailModel(
      id,
      unit,
      quantity,
      price,
      discount,
      igv,
      total,
      movement,
      product,
      status,
    );
  }
}
