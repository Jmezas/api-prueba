import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Trace } from '../shared/helpers/trace.helper';
import { CreateMenuDto } from './application/dto/create-menu.dto';
import { UpdateMenuDto } from './application/dto/update-menu.dto';
import { MenuApplication } from './application/menu.application';
import { MenuFactory } from './domain/models/menu.factory';

@Injectable()
export class MenuService {
  constructor(private Application: MenuApplication) {}
  async create(createMenuDto: CreateMenuDto) {
    try {
      Trace.TraceId(true);
      const obj = new MenuFactory().create(createMenuDto);
      const result = await this.Application.add(obj);

      return result;
    } catch (error) {
      throw new NotFoundException(error, '901');
    }
  }

  async findAll() {
    try {
      Trace.TraceId(true);
      const result = await this.Application.findAll({}, [], {
        id: 'desc',
      });
      return result;
    } catch (error) {
      throw new HttpException('message', 400, {
        cause: new Error(error),
      });
    }
  }

  async findOne(id: number) {
    try {
      Trace.TraceId(true);
      const result = await this.Application.findByOne({ id }, []);
      return result;
    } catch (error) {
      throw new NotFoundException(error, '901');
    }
  }

  async update(id: number, updateMovementDto: UpdateMenuDto) {
    try {
      Trace.TraceId(true);
      const productToInsert = { id: id, ...updateMovementDto };
      const product = new MenuFactory().create(productToInsert);
      const result = await this.Application.update(product, {}, []);
      return result;
    } catch (error) {
      throw new NotFoundException(error, '901');
    }
  }

  async remove(id: number) {
    try {
      Trace.TraceId(true);
      const result = await this.Application.delete({ id });
      return result;
    } catch (error) {
      throw new NotFoundException(error, '901');
    }
  }
  async fullpage(query: any) {
    try {
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
        },
        [],
        { id: 'desc' },
      );
      return result;
    } catch (error) {
      throw new NotFoundException(error, '901');
    }
  }

  async findAlltree() {
    try {
      Trace.TraceId(true);
      const result = await this.Application.findTree({});
      return result;
    } catch (error) {
      throw new HttpException('message', 400, {
        cause: new Error(error),
      });
    }
  }
  async findAlltreeRole(id: string) {
    try {
      Trace.TraceId(true);
      const result = await this.Application.findMenuRole({ id: id });
      return result;
    } catch (error) {
      throw new HttpException('message', 400, {
        cause: new Error(error),
      });
    }
  }
}
