import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateSaleDto } from './application/dto/sale.create.dto';
import { SaleApplication } from './application/sale.application';
import { SaleFactory } from './domain/models/sale.factory';

@Injectable()
export class SalesService {
  constructor(private Application: SaleApplication) {}
  async create(salecreate: CreateSaleDto) {
    try {
      Trace.TraceId(true);
      const obj = new SaleFactory().create(salecreate);
      const result = await this.Application.insertData(obj);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAll() {
    Trace.TraceId(true);
    const result = await this.Application.findAll(
      {},
      ['documentType', 'details', 'customer'],
      {},
    );
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, [
      'documentType',
      'details',
      'customer',
    ]);
    return result;
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
        issue_date: query.dateStart as any,
        payment_date: query.dateEnd as any,
        customer: {
          name: query.search,
          nroDocumento: query.search,
          //document: { description: query.search },
        } as any,
        documentType: { name: query.search } as any,
      },
      ['documentType', 'customer'],
      { id: 'desc' },
    );
    return result;
  }
}
