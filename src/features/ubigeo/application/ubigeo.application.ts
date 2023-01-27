import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { UbigeoModel } from '../domain/models/ubigeo.model';
import { UbigeoRepository } from '../domain/repositories/ubigeo.repository';
import { UbigeoDto } from './dto/dto';

@Injectable()
export class UbigeoApplication extends BaseApplication<UbigeoModel> {
  constructor(
    @Inject(BaseRepository)
    private ubigeoRepository: UbigeoRepository,
  ) {
    super(ubigeoRepository, new UbigeoDto());
  }

  async findAllCode(
    acction: string,
    department: string,
    province: string,
    district: string,
  ): Promise<UbigeoModel> {
    const data = await this.ubigeoRepository.findAllCode(
      acction,
      department,
      province,
      district,
    );
    return data;
  }
}
