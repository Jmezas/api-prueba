import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { SaleDetailApplication } from './application/sale-detail.application';
import { CreateDetailDto } from './application/dto/create-detail.dto';
import { UpdateDetailDto } from './application/dto/update-detail.dto';
import { SaleDetailFactory } from './domain/models/sale-detail.factory';

@Injectable()
export class DetailsService {
  constructor(private Application: SaleDetailApplication) {}
  async create(createDetailDto: CreateDetailDto) {
    try {
      Trace.TraceId(true);
      const detail = new SaleDetailFactory().create(createDetailDto);
      const result = await this.Application.add(detail);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    Trace.TraceId(true);
    const id = 8;
    const result = await this.Application.findAll(
      { sale: id },
      ['sale', 'product'],
      {},
    );
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, ['product']);
    return result;
  }

  update(id: number, updateDetailDto: UpdateDetailDto) {
    return `This action updates a #${id} detail`;
  }

  remove(id: number) {
    return `This action removes a #${id} detail`;
  }
}
