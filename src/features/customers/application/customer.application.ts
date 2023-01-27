import { Inject, Injectable } from '@nestjs/common';
import { CustomerModel } from '../domain/models/customer.model';
import { CustomerDto } from './dto/dto';
import { CustomerRepository } from '../domain/repositories/customer.repository';
import { GeneralRepository } from 'src/features/general/domain/repositories/general.repository';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
@Injectable()
export class CustomerApplication extends BaseApplication<CustomerModel> {
  constructor(
    @Inject(BaseRepository)
    private CustomerRepository: CustomerRepository,
    @Inject('GeneralRepository')
    private GeneralRepository: GeneralRepository,
  ) {
    super(CustomerRepository, new CustomerDto());
  }
}
