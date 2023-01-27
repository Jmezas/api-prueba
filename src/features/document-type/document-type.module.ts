import { Module } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { DocumentTypeController } from './document-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTypeEntity } from './domain/models/document-type.entity';
import { DocumentTypeApplication } from './application/document-type.application';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { DocumentTypeInfrastructure } from './infrastructure/document-type.infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentTypeEntity])],
  controllers: [DocumentTypeController],
  providers: [
    DocumentTypeService,
    DocumentTypeApplication,
    {
      provide: BaseRepository,
      useClass: DocumentTypeInfrastructure,
    },
  ],
})
export class DocumentTypeModule {}
