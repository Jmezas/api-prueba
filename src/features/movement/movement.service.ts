import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateMovementDto } from './application/dto/create-movement.dto';
import { UpdateMovementDto } from './application/dto/update-movement.dto';
import { MovementApplication } from './application/movement.application';
import { MovementFactory } from './domain/models/movement.factory';

@Injectable()
export class MovementService {
  constructor(private Application: MovementApplication) {}
  async create(createMovementDto: CreateMovementDto) {
    try {
      Trace.TraceId(true);
      const obj = new MovementFactory().create(createMovementDto);
      const result = await this.Application.insertData(obj);

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

  async update(id: number, updateMovementDto: UpdateMovementDto) {
    return `This action updates a #${id} movement`;
  }

  async remove(id: number) {
    return `This action removes a #${id} movement`;
  }
  async fullpage(query: any) {
    if (!query.search) {
      delete query.search;
    }
    if (!query.dateStart) {
      delete query.dateStart;
    }
    if (!query.dateEnd) {
      delete query.dateEnd;
    }
    Trace.TraceId(true);
    const result = await this.Application.getPage(
      query.page,
      query.limit,
      {
        status: true,
        serie: query.search,
        number: query.search,
        issue_date: query.dateStart + '|' + query.dateEnd,
      },
      ['operationType'],
      { id: 'desc' },
    );
    return result;
  }
}
