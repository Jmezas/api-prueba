import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';

import { DocumentTypeModel } from '../domain/models/document-type.model';
import { DocumentTypeDto } from './dto/dto';

@Injectable()
export class DocumentTypeApplication extends BaseApplication<DocumentTypeModel> {
  constructor(
    @Inject(BaseRepository)
    categoryRepository: BaseRepository<DocumentTypeModel, string>,
  ) {
    super(categoryRepository, new DocumentTypeDto());
  }
}
