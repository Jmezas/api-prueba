import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateUnitDto } from './application/dto/create-unit.dto';
import { UpdateUnitDto } from './application/dto/update-unit.dto';
import { UnitApplication } from './application/unit.application';
import { UnitFactory } from './domain/models/unit.factory';

@Injectable()
export class UnitService {
  constructor(private Application: UnitApplication) {}
  async create(createUnitDto: CreateUnitDto) {
    try {
      Trace.TraceId(true);
      const product = new UnitFactory().create(createUnitDto);
      const result = await this.Application.add(product);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    Trace.TraceId(true);
    const result = await this.Application.findAll({}, [], {});
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, []);
    return result;
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateUnitDto };
    const product = new UnitFactory().create(productToInsert);
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
