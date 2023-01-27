import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateUbigeoDto } from './application/dto/create-ubigeo.dto';
import { UpdateUbigeoDto } from './application/dto/update-ubigeo.dto';
import { UbigeoApplication } from './application/ubigeo.application';
import { UbigeoFactory } from './domain/models/ubigeo.factory';

@Injectable()
export class UbigeoService {
  constructor(private Application: UbigeoApplication) {}
  async create(createUbigeoDto: CreateUbigeoDto[]) {
    try {
      let result = [];
      Trace.TraceId(true);
      for (const item of createUbigeoDto) {
        const product = new UbigeoFactory().create(item);
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
    const result = await this.Application.findAll({}, [], {});
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, []);
    return result;
  }

  async findmultiple(
    accion: string,
    departamento: string,
    provincia: string,
    distrito: string,
  ) {
    Trace.TraceId(true);
    const result = await this.Application.findAllCode(
      accion,
      departamento,
      provincia,
      distrito,
    );
    return result;
  }

  async update(id: number, updateUbigeoDto: UpdateUbigeoDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateUbigeoDto };
    const product = new UbigeoFactory().create(productToInsert);
    const result = await this.Application.update(product, {}, []);
    return result;
  }

  async remove(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.delete({ id });
    return result;
  }
}
