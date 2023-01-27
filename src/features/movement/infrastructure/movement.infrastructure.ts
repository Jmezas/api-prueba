import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralEntity } from 'src/features/general/domain/models/general.entity';
import { ResponseDto } from 'src/features/shared/application/interfaces/dtos/response.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { Trace } from 'src/features/shared/helpers/trace.helper';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Between, In, Like, Repository } from 'typeorm';
import { MovementEntity } from '../domain/models/movement.entity';
import { MovementModel } from '../domain/models/movement.model';
import { MovementRepository } from '../domain/repositories/movement.repository';

@Injectable()
export class MovementInfrastructure
  extends BaseInfrastructure<MovementModel>
  implements MovementRepository
{
  constructor(
    @InjectRepository(MovementEntity)
    private readonly Repository: Repository<MovementEntity>,
    @InjectRepository(GeneralEntity)
    private readonly RepositoryGeneral: Repository<GeneralEntity>,
  ) {
    super(Repository);
  }
  async insertMovement(sale: MovementEntity): Promise<MovementEntity> {
    const data = await this.Repository.save(sale);
    return data;
  }
  async findBylast(): Promise<MovementEntity> {
    const data = await this.Repository.query(
      `SELECT * FROM movement  ORDER BY id DESC LIMIT 1`,
    ).catch((error) => {
      console.log(error);
    });
    return data;
  }
  override async getPage(
    page: number,
    pagesize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<MovementEntity>> {
    let first = (where as any).issue_date.split('|')[0];
    if (first === 'undefined') {
      first = '1900-01-01';
    }

    let end = (where as any).issue_date.split('|')[0];
    if (end === 'undefined') {
      end = '1900-01-01';
    }

    delete (where as any).issue_date;

    console.log(where);

    const [data, total] = await this.Repository.findAndCount({
      where: [
        {
          // ...where,
          issue_date: Between(new Date(2023, 1, 16), new Date(2023, 1, 16)),
        },
        // {
        //   serie: Like(`%${(where as any).serie}%`),
        // },
        // {
        //   number: (where as any).number || 0,
        // },

        where,
      ],
      relations,
      order,
      skip: page * pagesize,
      take: pagesize,
    });

    const types = await this.RepositoryGeneral.find({
      where: {
        code: In(data.map((item) => item.type)),
        parentcode: 3,
      },
    });
    const typesMap: Record<string, string> = Object.fromEntries(
      types.map((t) => [t.code, t.description]),
    );

    for (const item of data) item.type = typesMap[item.type];

    return ResponseDto<MovementEntity>(Trace.TraceId(), data, total);
  }
}
