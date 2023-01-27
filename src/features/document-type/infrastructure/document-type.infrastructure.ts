import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { DocumentTypeEntity } from '../domain/models/document-type.entity';
import { DocumentTypeModel } from '../domain/models/document-type.model';
import { DocumentTypeRepository } from '../domain/repositories/document-type.respository';

@Injectable()
export class DocumentTypeInfrastructure
  extends BaseInfrastructure<DocumentTypeModel>
  implements DocumentTypeRepository
{
  constructor(
    @InjectRepository(DocumentTypeEntity)
    private readonly DocumentTypeRepository: Repository<DocumentTypeEntity>,
  ) {
    super(DocumentTypeRepository);
  }
}
