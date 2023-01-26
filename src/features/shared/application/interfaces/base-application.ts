import { BaseRepository } from '../../domain/repositories/base-repository';
import { DTOAbstract } from './dtos/abstract.dto';
import Result from './result.interface';

export class BaseApplication<T> {
  constructor(
    private repository: BaseRepository<T, number>,
    private dto: DTOAbstract<T>,
  ) {}
  async add(entity: T): Promise<Result<T>> {
    try {
      const result = await this.repository.insert(entity);
      return this.dto.mapping(result);
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(
    entity: T,
    where: object,
    relations: string[],
  ): Promise<Result<T>> {
    const result = await this.repository.update(entity, where, relations);
    return this.dto.mapping(result);
  }
  async delete(where: object): Promise<Result<T>> {
    const result = await this.repository.delete(where);
    return this.dto.mapping(result);
  }
  async findByOne(where: object, relations: string[]): Promise<Result<T>> {
    const result = await this.repository.findByOne(where, relations);
    return this.dto.mapping(result);
  }
  async findAll(
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string },
  ): Promise<Result<T>> {
    const result = await this.repository.findAll(where, relations, order);
    return this.dto.mapping(result);
  }
  async getPage(
    page: number,
    pagesize: number,
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string },
  ) {
    return await this.repository.getPage(
      page,
      pagesize,
      where,
      relations,
      order,
    );
  }
}
