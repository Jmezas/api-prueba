import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { SaleModel } from '../models/sale.model';

export interface SaleRepository extends BaseRepository<SaleModel, string> {
  insertSale(sale: SaleModel): Promise<SaleModel>;
}
