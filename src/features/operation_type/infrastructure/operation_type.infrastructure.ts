import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { OperationTypeEntity } from '../domain/models/operation_type.entity';
import { OperationTypeModel } from '../domain/models/operation_type.model';
import { OperationTypeRepository } from '../domain/repositories/operation_type.repository';

@Injectable()
export class OperationTypeInfrastructure
  extends BaseInfrastructure<OperationTypeModel>
  implements OperationTypeRepository
{
  constructor(
    @InjectRepository(OperationTypeEntity)
    private readonly Repository: Repository<OperationTypeEntity>,
  ) {
    super(Repository);
  }
}
