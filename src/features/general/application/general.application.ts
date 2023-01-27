import { Inject, Injectable } from '@nestjs/common';
import { CustomerDto } from './dto/dto';
import { GeneralModel } from '../domain/models/general.model';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
@Injectable()
export class GeneralApplication extends BaseApplication<GeneralModel> {
  constructor(
    @Inject(BaseRepository)
    CustomerRepository: BaseRepository<GeneralModel, string>,
  ) {
    super(CustomerRepository, new CustomerDto());
  }
}
