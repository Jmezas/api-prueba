import { Inject, Injectable } from '@nestjs/common';
import { GeneralRepository } from 'src/features/general/domain/repositories/general.repository';
import { MovementDetailRepository } from 'src/features/movement-detail/domain/repositories/movement-detail.repository';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { ResponseDto } from 'src/features/shared/application/interfaces/dtos/response.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { Trace } from 'src/features/shared/helpers/trace.helper';
import { MovementModel } from '../domain/models/movement.model';
import { MovementRepository } from '../domain/repositories/movement.repository';
import { MovementDto } from './dto/dto';

@Injectable()
export class MovementApplication extends BaseApplication<MovementModel> {
  constructor(
    @Inject(BaseRepository)
    private MovementRepository: MovementRepository,
    @Inject('MovementDetailRepository')
    private detailsaleRepository: MovementDetailRepository,
    @Inject('GeneralRepository')
    private GeneralRepository: GeneralRepository,
  ) {
    super(MovementRepository, new MovementDto());
  }
  async insertData(entity: MovementModel): Promise<Result<MovementModel>> {
    const last = await this.MovementRepository.findBylast();

    entity.number = last ? last[0].number + 1 : 1;
    const data = await this.MovementRepository.insertMovement(entity);

    let detaillist = [];
    for (const detail of entity.details) {
      detail.movement = data as any;
      const res = await this.detailsaleRepository.insertDetail(detail);
      detaillist.push(res);
    }
    const detail = await this.detailsaleRepository.findAll(
      { id: data.id },
      ['product'],
      {},
    );

    data.details = detail.payload.data as any;
    for (const detail of data.details) {
      delete detail.movement;
    }
    const result = ResponseDto<MovementModel>(Trace.TraceId(), data);
    return new MovementDto().mapping(result);
  }
}
