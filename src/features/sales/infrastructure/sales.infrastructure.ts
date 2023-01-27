import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Like, Repository } from 'typeorm';
import { SaleEntity } from '../domain/models/sale.entity';
import { SaleModel } from '../domain/models/sale.model';
import { SaleRepository } from '../domain/respositories/sale.repository';
import * as _ from 'lodash';
import { ResponseDto } from 'src/features/shared/application/interfaces/dtos/response.dto';
import { Trace } from 'src/features/shared/helpers/trace.helper';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { GeneralEntity } from 'src/features/general/domain/models/general.entity';
import { SaleDetailEntity } from 'src/features/sale-details/domain/models/sale-detail.entity';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
@Injectable()
export class SaleInfrastructure
  extends BaseInfrastructure<SaleModel>
  implements SaleRepository
{
  constructor(
    @InjectRepository(SaleEntity)
    private readonly SaleRepository: Repository<SaleEntity>,
    @InjectRepository(GeneralEntity)
    private readonly RepositoryGeneral: Repository<GeneralEntity>,
    @InjectRepository(SaleDetailEntity)
    private readonly DetailSaleRepository: Repository<SaleDetailEntity>,
  ) {
    super(SaleRepository);
  }
  override async findByOne(
    where: object = {},
    relations: string[] = [],
  ): Promise<Result<SaleEntity>> {
    const data: SaleEntity = await this.SaleRepository.findOne({
      where,
      relations,
    });
    const types = await this.RepositoryGeneral.find({
      where: {
        code: data.payment_condition as any,
        parentcode: 2,
      },
    });
    const typesMap: Record<string, string> = Object.fromEntries(
      types.map((t) => [t.code, t.description]),
    );
    data.payment_condition = typesMap[data.payment_condition];

    //detalle
    let allDetail = [];

    const details = await this.DetailSaleRepository.find({
      where: {
        sale: {
          id: data.id,
        },
      },
      relations: ['product'],
    });
    data.details = details;
    return ResponseDto<SaleEntity>(Trace.TraceId(), data);
  }

  async insertSale(sale: SaleEntity): Promise<SaleEntity> {
    const data = await this.SaleRepository.save(sale);
    return data;
  }
  override async getPage(
    page: number,
    pagesize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<SaleEntity>> {
    console.log((where as any).issue_date, (where as any).payment_date);
    const [data, total] = await this.SaleRepository.findAndCount({
      where: [
        {
          issue_date: Between(
            (where as any).issue_date,
            (where as any).payment_date,
          ),
        },
        {
          customer: {
            name: Like(`%${(where as any).customer.name}%`),
          },
        },
        {
          customer: {
            nroDocumento: Like(`%${(where as any).customer.nroDocumento}%`),
          },
        },
        {
          documentType: { name: Like(`%${(where as any).documentType.name}%`) },
        },
        where,
      ],
      relations,
      order,
      skip: page * pagesize,
      take: pagesize,
    });

    const types = await this.RepositoryGeneral.find({
      where: {
        code: In(data.map((item) => item.payment_condition)),
        parentcode: 2,
      },
    });
    const typesMap: Record<string, string> = Object.fromEntries(
      types.map((t) => [t.code, t.description]),
    );

    for (const item of data)
      item.payment_condition = typesMap[item.payment_condition];

    return ResponseDto<SaleEntity>(Trace.TraceId(), data, total);
  }
}
