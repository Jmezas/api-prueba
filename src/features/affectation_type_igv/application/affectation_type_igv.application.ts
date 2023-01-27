import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { AffectationTypeIgvModel } from '../domain/models/affectation_type_igv.model';
import { AffectationTypeIgvRepository } from '../domain/respositories/affectation_type_igv.repository';
import { AffectationTypeIgvDto } from './dto/dto';

@Injectable()
export class AffectationTypeIgvApplication extends BaseApplication<AffectationTypeIgvModel> {
  constructor(
    @Inject(BaseRepository)
    categoryRepository: AffectationTypeIgvRepository,
  ) {
    super(categoryRepository, new AffectationTypeIgvDto());
  }
}
