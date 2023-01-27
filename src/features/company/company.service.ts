import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CompanyApplication } from './application/company.application';
import { CreateCompanyDto } from './application/dto/create-company.dto';
import { UpdateCompanyDto } from './application/dto/update-company.dto';
import { CompanyFactory } from './domain/models/company.factory';

@Injectable()
export class CompanyService {
  constructor(private Application: CompanyApplication) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      Trace.TraceId(true);
      const company = new CompanyFactory().create(createCompanyDto);
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

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateCompanyDto };
    const product = new CompanyFactory().create(productToInsert);
    const result = await this.Application.update(product, {}, []);
    return result;
  }

  async remove(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.delete({ id });
    return result;
  }
}
