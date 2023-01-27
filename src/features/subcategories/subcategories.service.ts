import { Injectable } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateSubcategoryDto } from './application/dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './application/dto/update-subcategory.dto';
import { SubcategoryApplication } from './application/subcotegory.application';
import { SubcategoryFactory } from './domain/models/subcategory.factory';

@Injectable()
export class SubcategoriesService {
  constructor(private Application: SubcategoryApplication) {}
  async create(createSubcategoryDto: CreateSubcategoryDto) {
    try {
      Trace.TraceId(true);
      const product = new SubcategoryFactory().create(createSubcategoryDto);
      const result = await this.Application.add(product);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateSubcategoryDto };
    const product = new SubcategoryFactory().create(productToInsert);
    const result = await this.Application.update(product, {}, []);
    return result;
  }
  async findAll() {
    Trace.TraceId(true);
    const result = await this.Application.findAll({}, ['category'], {});
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, ['category']);
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
      { name: query.search, status: true },
      ['category'],
      { id: 'desc' },
    );
    return result;
  }
}
