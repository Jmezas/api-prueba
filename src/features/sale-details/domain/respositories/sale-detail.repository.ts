import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { SaleDetailModel } from '../models/sale-detail.model';

export interface SaleDetailRepository
  extends BaseRepository<SaleDetailModel, string> {
  insertDetail(entity: SaleDetailModel): Promise<SaleDetailModel>;
}
