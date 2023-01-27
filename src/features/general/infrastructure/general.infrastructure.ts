import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/features/shared/application/interfaces/dtos/response.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { Trace } from 'src/features/shared/helpers/trace.helper';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Like, Repository } from 'typeorm';
import { GeneralEntity } from '../domain/models/general.entity';
import { GeneralModel } from '../domain/models/general.model';
import { GeneralRepository } from '../domain/repositories/general.repository';

@Injectable()
export class GeneralInfrastructure
  extends BaseInfrastructure<GeneralModel>
  implements GeneralRepository
{
  constructor(
    @InjectRepository(GeneralEntity)
    private readonly GeneralRepository: Repository<GeneralEntity>,
  ) {
    super(GeneralRepository);
  }
  override async getPage(
    page: number,
    pagesize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<GeneralEntity>> {
    console.log('where', where, relations);

    const [data, total] = await this.GeneralRepository.findAndCount({
      where: [{ description: Like(`%${(where as any).description}%`) }, where],
      relations,
      order,
      skip: page * pagesize,
      take: pagesize,
    });
    return ResponseDto<GeneralEntity>(Trace.TraceId(), data, total);
  }
}
