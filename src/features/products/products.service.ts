import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './application/dto/update-product.dto';
import { ProductApplication } from './application/product.application';
import { ProductFactory } from './domain/models/product.factory';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateProductDto } from './application/dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private Application: ProductApplication) {}

  async create(ProductDto: CreateProductDto) {
    try {
      Trace.TraceId(true);
      const product = new ProductFactory().create(ProductDto);
      const result = await this.Application.add(product);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateProductDto };
    const product = new ProductFactory().create(productToInsert);
    const result = await this.Application.update(product, {}, []);
    return result;
  }
  async findAll(query: any) {
    if (!query.search) {
      delete query.search;
    }
    Trace.TraceId(true);
    const result = await this.Application.findAll(
      {
        status: true,
        name: query.search,
        code: query.search,
      },
      ['category', 'unit'],
      {},
    );
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, [
      'category',
      'operation_type',
      'unit',
    ]);
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
        code: query.search,
        category: { name: query.search } as any,
      },
      ['category', 'operation_type', 'unit'],
      { id: 'desc' },
    );
    return result;
  }

  async checkStock(Product: number, warehouse: number) {
    Trace.TraceId(true);
    const result = await this.Application.checkStock(Product, warehouse);
    return result;
  }
  async getStockByWarehouse(query: any) {
    console.log('entro');
    if (!query.search) {
      delete query.search;
    }
    Trace.TraceId(true);
    const result = await this.Application.getStockByWarehouse(
      query.page,
      query.limit,
      {
        status: true,
        product: { name: query.search, code: query.search } as any,
        warehouse: { name: query.search } as any,
      },
      ['product', 'warehouse'],
      { id: 'desc' },
    );
    return result;
  }
}
