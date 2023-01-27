import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';

import { CompanyModel } from '../domain/models/company.model';
import { CompanyRepository } from '../domain/repositories/company.repository';

import { CategoryDto } from './dto/dto';
@Injectable()
export class CompanyApplication extends BaseApplication<CompanyModel> {
  constructor(
    @Inject(BaseRepository)
    categoryRepository: CompanyRepository,
  ) {
    super(categoryRepository, new CategoryDto());
  }
}
