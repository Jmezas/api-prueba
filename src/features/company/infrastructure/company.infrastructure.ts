import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../domain/models/company.entity';
import { CompanyModel } from '../domain/models/company.model';
import { CompanyRepository } from '../domain/repositories/company.repository';

@Injectable()
export class CompanyInfrastructure
  extends BaseInfrastructure<CompanyModel>
  implements CompanyRepository
{
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly CompanyRepository: Repository<CompanyEntity>,
  ) {
    super(CompanyRepository);
  }
}
