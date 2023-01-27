import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { AffectationTypeIgvApplication } from './application/affectation_type_igv.application';
import { CreateAffectationTypeIgvDto } from './application/dto/create-affectation_type_igv.dto';
import { UpdateAffectationTypeIgvDto } from './application/dto/update-affectation_type_igv.dto';
import { AffectationTypeIgvFactory } from './domain/models/affectation_type_igv.factory';

@Injectable()
export class AffectationTypeIgvService {
  constructor(private Application: AffectationTypeIgvApplication) {}
  async create(createAffectationTypeIgvDto: CreateAffectationTypeIgvDto) {
    try {
      Trace.TraceId(true);
      const product = new AffectationTypeIgvFactory().create(
        createAffectationTypeIgvDto,
      );
      const result = await this.Application.add(product);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    Trace.TraceId(true);
    const result = await this.Application.findAll({}, [], { id: 'asc' });
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, ['subCategory']);
    return result;
  }

  async update(
    id: number,
    updateAffectationTypeIgvDto: UpdateAffectationTypeIgvDto,
  ) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateAffectationTypeIgvDto };
    const product = new AffectationTypeIgvFactory().create(productToInsert);
    const result = await this.Application.update(product, {}, []);
    return result;
  }

  async remove(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.delete({ id });
    return result;
  }
}
