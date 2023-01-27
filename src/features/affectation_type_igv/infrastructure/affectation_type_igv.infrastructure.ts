import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { AffectationTypeIgvEntity } from '../domain/models/affectation_type_igv.entity';
import { AffectationTypeIgvModel } from '../domain/models/affectation_type_igv.model';
import { AffectationTypeIgvRepository } from '../domain/respositories/affectation_type_igv.repository';
@Injectable()
export class AffectationTypeIgvInfrastructure
  extends BaseInfrastructure<AffectationTypeIgvModel>
  implements AffectationTypeIgvRepository
{
  constructor(
    @InjectRepository(AffectationTypeIgvEntity)
    private readonly Repository: Repository<AffectationTypeIgvEntity>,
  ) {
    super(Repository);
  }
}
