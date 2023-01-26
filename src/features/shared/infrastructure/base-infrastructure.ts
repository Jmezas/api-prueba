import { Like, Repository } from 'typeorm';
import { ResponseDto } from '../application/interfaces/dtos/response.dto';
import Result from '../application/interfaces/result.interface';
import * as _ from 'lodash';
import { Trace } from '../helpers/trace.helper';
export abstract class BaseInfrastructure<T> {
  constructor(private repository: Repository<T>) {}

  async insert(entity: T): Promise<Result<T>> {
    const data = await this.repository.save(entity);
    return ResponseDto<T>(Trace.TraceId(), data);
  }
  async update(
    entity: Partial<T>,
    where: object,
    relations: string[] = [],
  ): Promise<Result<T>> {
    let recordsToUpdate: any = await this.repository.findOne({
      where,
      relations,
    });
    recordsToUpdate = _.merge(recordsToUpdate, entity);
    await this.repository.save(recordsToUpdate);
    return ResponseDto<T>(Trace.TraceId(), recordsToUpdate);
  }
  async delete(where: object): Promise<Result<T>> {
    let recordsToDelete: any = await this.repository.findOne({
      where,
    });
    recordsToDelete = _.merge(recordsToDelete, { status: false });
    await this.repository.save(recordsToDelete);
    return ResponseDto<T>(Trace.TraceId(), recordsToDelete);
  }

  async findByOne(
    where: object = {},
    relations: string[] = [],
  ): Promise<Result<T>> {
    const data: T = await this.repository.findOne({ where, relations });
    return ResponseDto<T>(Trace.TraceId(), data);
  }
  async findAll(
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<T>> {
    const _where = Object.assign(where, { status: true });
    const data: T[] = await this.repository.find({
      where: _where,
      relations,
      order,
    });
    return ResponseDto<T>(Trace.TraceId(), data);
  }
  async getPage(
    page: number,
    pagesize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<T>> {
    const [data, total] = await this.repository.findAndCount({
      where: [where, { name: Like(`%${(where as any).name}%`) }],
      relations,
      order,
      skip: page * pagesize,
      take: pagesize,
    });
    return ResponseDto<T>(Trace.TraceId(), data, total);
  }
}
