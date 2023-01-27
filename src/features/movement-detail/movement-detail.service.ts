import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateMovementDetailDto } from './application/dto/create-movement-detail.dto';
import { UpdateMovementDetailDto } from './application/dto/update-movement-detail.dto';
import { MovementDetailApplication } from './application/movement-detail.application';
import { MovementDetailFactory } from './domain/models/movement-detail.factory';

@Injectable()
export class MovementDetailService {
  constructor(private Application: MovementDetailApplication) {}
  async create(createMovementDetailDto: CreateMovementDetailDto) {
    try {
      Trace.TraceId(true);
      const obj = new MovementDetailFactory().create(createMovementDetailDto);
      const result = await this.Application.add(obj);

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

  async update(id: number, updateMovementDetailDto: UpdateMovementDetailDto) {
    return `This action updates a #${id} movementDetail`;
  }

  async remove(id: number) {
    return `This action removes a #${id} movementDetail`;
  }
}
