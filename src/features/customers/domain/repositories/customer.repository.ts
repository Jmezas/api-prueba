import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { CustomerModel } from '../models/customer.model';

export interface CustomerRepository
  extends BaseRepository<CustomerModel, string> {}
