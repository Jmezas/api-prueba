import { MovementModel } from 'src/features/movement/domain/models/movement.model';
import { ProductModel } from 'src/features/products/domain/models/product.model';

export class MovementDetailModel {
  constructor(
    public id: number,
    public unit: string,
    public quantity: number,
    public price: number,
    public discount: number,
    public igv: number,
    public total: number,
    public movement: number | MovementModel,
    public product: number | ProductModel,
    public status: boolean,
  ) {}
}
