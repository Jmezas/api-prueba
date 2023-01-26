import { Injectable, NotFoundException } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateUserDto } from './application/dto/create-user.dto';
import { UpdateUserDto } from './application/dto/update-user.dto';
import { UserApplication } from './application/user.application';
import { UserFactory } from './domain/models/user.factory';

@Injectable()
export class UsersService {
  constructor(private Application: UserApplication) {}
  async create(createUserDto: CreateUserDto) {
    try {
      Trace.TraceId(true);
      const product = new UserFactory().create(createUserDto);
      const result = await this.Application.add(await product);
      return result;
    } catch (error) {
      throw new NotFoundException(error, 'S004');
    }
  }

  async findAll() {
    Trace.TraceId(true);
    const result = await this.Application.findAll({}, ['roles'], {});
    return result;
  }

  async findOne(id: number) {
    Trace.TraceId(true);
    const result = await this.Application.findByOne({ id }, [
      'roles',
      'warehouses',
    ]);
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    Trace.TraceId(true);
    const productToInsert = { id: id, ...updateUserDto };
    const product = new UserFactory().create(productToInsert);
    const result = await this.Application.update(await product, {}, []);
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
      ['roles'],
      { id: 'desc' },
    );
    return result;
  }
}
