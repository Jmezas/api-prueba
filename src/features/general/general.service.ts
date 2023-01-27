import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateGeneralDto } from './application/dto/create-general.dto';
import { UpdateGeneralDto } from './application/dto/update-general.dto';
import { GeneralApplication } from './application/general.application';
import { GeneralFactory } from './domain/models/general.factory';

@Injectable()
export class GeneralService {
  constructor(private Application: GeneralApplication) {}
  async create(createGeneralDto: CreateGeneralDto) {
    try {
      Trace.TraceId(true);
      const product = new GeneralFactory().create(createGeneralDto);
      const result = await this.Application.add(product);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(query: any) {
    Trace.TraceId(true);
    const result = await this.Application.findAll(
      { parentcode: query.code },
      [],
      {},
    );
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, []);
    return result;
  }

  async update(id: number, updateGeneralDto: UpdateGeneralDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateGeneralDto };
    const product = new GeneralFactory().create(productToInsert);
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
      { status: true, description: query.search },
      [],
      { id: 'desc' },
    );
    return result;
  }
}
