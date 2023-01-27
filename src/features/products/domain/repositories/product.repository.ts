import Result from 'src/features/shared/application/interfaces/result.interface';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { ProductModel } from '../models/product.model';
import { WarehouseStockEntity } from '../models/warehouse_stock.entity';

export interface ProductRepository
  extends BaseRepository<ProductModel, string> {
  checkStock(product: number, warehouse: number): Promise<any>;
  getStockByWarehouse(
    page: number,
    pagesize: number,
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string },
  ): Promise<Result<WarehouseStockEntity>>;
}
