import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateWarehouseDto } from './application/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './application/dto/update-warehouse.dto';
import { WarehouseApplication } from './application/warehouse.application';
import { WarehouseFactory } from './domain/models/warehouse.factory';

@Injectable()
export class WarehouseService {
  constructor(private Application: WarehouseApplication) {}
  async create(createWarehouseDto: CreateWarehouseDto) {
    try {
      Trace.TraceId(true);
      const company = new WarehouseFactory().create(createWarehouseDto);
      const result = await this.Application.add(company);
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

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateWarehouseDto };
    const product = new WarehouseFactory().create(productToInsert);
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
      ['ubigeo'],
      { id: 'desc' },
    );
    return result;
  }
}
