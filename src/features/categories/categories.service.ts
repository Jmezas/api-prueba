import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CategoryApplication } from './application/category.application';
import { CreateCategoryDto } from './application/dto/create-category.dto';
import { UpdateCategoryDto } from './application/dto/update-category.dto';
import { CategoryFactory } from './domain/models/category.factory';

@Injectable()
export class CategoriesService {
  constructor(private Application: CategoryApplication) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      Trace.TraceId(true);
      const product = new CategoryFactory().create(createCategoryDto);
      const result = await this.Application.add(product);
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
    const result = await this.Application.findByOne({ id }, ['subCategory']);
    return result;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateCategoryDto };
    const product = new CategoryFactory().create(productToInsert);
    const result = await this.Application.update(product, {}, []);
    return result;
  }

  async remove(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.delete({ id });
    return result;
  }
  async fullpage(query: any, page: number, limit: number) {
    if (!query.search) {
      delete query.search;
    }
    Trace.TraceId(true);
    const result = await this.Application.getPage(
      page,
      limit,
      { name: query.search, status: true },
      [],
      { id: 'desc' },
    );
    return result;
  }
}
