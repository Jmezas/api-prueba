import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/features/shared/application/interfaces/dtos/response.dto';

import { In, Like, Repository } from 'typeorm';
import { CustomerEntity } from '../domain/models/customer.entity';
import { CustomerModel } from '../domain/models/customer.model';
import { CustomerRepository } from '../domain/repositories/customer.repository';
import { GeneralEntity } from 'src/features/general/domain/models/general.entity';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { Trace } from 'src/features/shared/helpers/trace.helper';

@Injectable()
export class CustomerInfrastructure
  extends BaseInfrastructure<CustomerModel>
  implements CustomerRepository
{
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly CustomerRepository: Repository<CustomerEntity>,
    @InjectRepository(GeneralEntity)
    private readonly GeneralEntityRepository: Repository<GeneralEntity>,
  ) {
    super(CustomerRepository as any);
  }
  override async getPage(
    page: number,
    pagesize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<CustomerEntity>> {
    const [data, total] = await this.CustomerRepository.findAndCount({
      where: [
        { name: Like(`%${(where as any).name}%`) },
        { nroDocumento: Like(`%${(where as any).nroDocumento}%`) },
        { email: Like(`%${(where as any).email}%`) },
        { phone: Like(`%${(where as any).phone}%`) },
        { address: Like(`%${(where as any).address}%`) },
        //{ document: { description: Like(`%${(where as any).description}%`) } },
        where,
      ],
      relations,
      order,
      skip: page * pagesize,
      take: pagesize,
    });

    const types = await this.GeneralEntityRepository.find({
      where: {
        code: In(data.map((item) => item.document)),
        parentcode: 1,
      },
    });
    const typesMap: Record<string, string> = Object.fromEntries(
      types.map((t) => [t.code, t.description]),
    );

    for (const item of data) item.document = typesMap[item.document];
    return ResponseDto<CustomerEntity>(Trace.TraceId(), data, total);
  }

  override async findAll(
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<CustomerEntity>> {
    const data: CustomerEntity[] = await this.CustomerRepository.find({
      where: [
        //{ document: { id: (where as any).document.id } },
        { name: Like(`%${(where as any).name}%`) },
        { nroDocumento: Like(`%${(where as any).nroDocumento}%`) },
        where,
      ],
      relations,
      order,
    });
    return ResponseDto<CustomerEntity>(Trace.TraceId(), data);
  }
}
