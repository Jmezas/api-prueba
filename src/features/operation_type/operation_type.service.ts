import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateOperationTypeDto } from './application/dto/create-operation_type.dto';
import { UpdateOperationTypeDto } from './application/dto/update-operation_type.dto';
import { OperationTypeApplication } from './application/operation_type.application';
import { OperationTypeFactory } from './domain/models/operation_type.factory';

@Injectable()
export class OperationTypeService {
  constructor(private Application: OperationTypeApplication) {}
  async create(createOperationTypeDto: CreateOperationTypeDto[]) {
    try {
      let result = [];
      Trace.TraceId(true);
      for (const item of createOperationTypeDto) {
        const product = new OperationTypeFactory().create(item);
        const detail = await this.Application.add(product);
        result.push(detail);
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    Trace.TraceId(true);
    const id = 8;
    const result = await this.Application.findAll({}, [], {});
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, []);
    return result;
  }

  async update(id: number, updateOperationTypeDto: UpdateOperationTypeDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateOperationTypeDto };
    const product = new OperationTypeFactory().create(productToInsert);
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
      { name: query.search, status: true },
      [],
      { id: 'desc' },
    );
    return result;
  }
}
