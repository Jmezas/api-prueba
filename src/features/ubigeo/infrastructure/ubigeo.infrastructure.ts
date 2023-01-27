import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { UbigeoEntity } from '../domain/models/ubigeo.entity';
import { UbigeoModel } from '../domain/models/ubigeo.model';
import { UbigeoRepository } from '../domain/repositories/ubigeo.repository';

@Injectable()
export class UbigeoInfrastructure
  extends BaseInfrastructure<UbigeoModel>
  implements UbigeoRepository
{
  constructor(
    @InjectRepository(UbigeoEntity)
    private readonly Repository: Repository<UbigeoEntity>,
  ) {
    super(Repository);
  }
  findAllCode(
    acction: string,
    department: string,
    province: string,
    district: string,
  ): Promise<UbigeoModel> {
    const data = this.Repository.query(
      `SELECT idubi, code,descriptions FROM ubicaciones ('${acction}', '${department}' ,  '${province}' , '${district}')`,
    ).catch((error) => {
      console.log(error);
    });

    return data;
  }
}
