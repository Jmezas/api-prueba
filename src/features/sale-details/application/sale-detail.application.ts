import { Inject, Injectable } from '@nestjs/common';
import { SaleDetailModel } from '../domain/models/sale-detail.model';
import { SaleDetailDto } from './dto/dto';
import { SaleDetailRepository } from '../domain/respositories/sale-detail.repository';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
@Injectable()
export class SaleDetailApplication extends BaseApplication<SaleDetailModel> {
  constructor(
    @Inject(BaseRepository)
    private SaleDetailRepository: SaleDetailRepository,
  ) {
    super(SaleDetailRepository, new SaleDetailDto());
  }
}
