import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { DocumentTypeApplication } from './application/document-type.application';
import { CreateDocumentTypeDto } from './application/dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './application/dto/update-document-type.dto';
import { DocumentTypeFactory } from './domain/models/document-type.factory';

@Injectable()
export class DocumentTypeService {
  constructor(private Application: DocumentTypeApplication) {}
  async create(createDocumentTypeDto: CreateDocumentTypeDto) {
    try {
      Trace.TraceId(true);
      const product = new DocumentTypeFactory().create(createDocumentTypeDto);
      const result = await this.Application.add(product);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    Trace.TraceId(true);
    const result = await this.Application.findAll({}, [], { id: 'desc' });
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, []);
    return result;
  }

  async update(id: number, updateDocumentTypeDto: UpdateDocumentTypeDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateDocumentTypeDto };
    const product = new DocumentTypeFactory().create(productToInsert);
    const result = await this.Application.update(product, {}, []);
    return result;
  }

  async remove(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.delete({ id });
    return result;
  }
  async fullpage(query: any) {
    if (!query.search) {
      delete query.search;
    }
    Trace.TraceId(true);
    const result = await this.Application.getPage(
      query.page,
      query.limit,
      {
        name: query.search,
      },
      [],
      { id: 'desc' },
    );
    return result;
  }
}
