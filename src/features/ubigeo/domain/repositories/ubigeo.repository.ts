import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { UbigeoModel } from '../models/ubigeo.model';

export interface UbigeoRepository extends BaseRepository<UbigeoModel, string> {
  findAllCode(
    acction: string,
    department: string,
    province: string,
    district: string,
  ): Promise<UbigeoModel>;
}
