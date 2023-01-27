import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CustomerApplication } from './application/customer.application';
import { CreateCustomerDto } from './application/dto/create-customer.dto';
import { UpdateCustomerDto } from './application/dto/update-customer.dto';
import { CustomerFactory } from './domain/models/customer.factory';

@Injectable()
export class CustomersService {
  constructor(private Application: CustomerApplication) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      Trace.TraceId(true);
      const product = new CustomerFactory().create(createCustomerDto);
      const result = await this.Application.add(product);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(query: any) {
    if (!query.search) {
      delete query.search;
    }
    console.log(query);
    Trace.TraceId(true);
    const result = await this.Application.findAll(
      {
        name: query.search,
        nroDocumento: query.search,
        document: parseInt(query.type),
        status: true,
      },
      ['ubigeo'],
      {},
    );
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, []);
    return result;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateCustomerDto };
    const product = new CustomerFactory().create(productToInsert);
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
      {
        status: true,
        name: query.search,
        nroDocumento: query.search,
        email: query.search,
        phone: query.search,
        address: query.search,
        //   document: { description: query.search } as any,
      },
      ['ubigeo'],
      { id: 'desc' },
    );
    return result;
  }
}
