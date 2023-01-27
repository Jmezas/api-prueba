import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProductEntity } from '../domain/models/product.entity';
import { ProductModel } from '../domain/models/product.model';
import { ProductRepository } from '../domain/repositories/product.repository';
import { WarehouseStockEntity } from '../domain/models/warehouse_stock.entity';
import { ResponseDto } from 'src/features/shared/application/interfaces/dtos/response.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { Trace } from 'src/features/shared/helpers/trace.helper';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';

@Injectable()
export class ProductInfrastructure
  extends BaseInfrastructure<ProductModel>
  implements ProductRepository
{
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(WarehouseStockEntity)
    private readonly WarehouseStockRepository: Repository<WarehouseStockEntity>,
  ) {
    super(productRepository);
  }
  async checkStock(product: number, warehouse: number): Promise<any> {
    const result = await this.WarehouseStockRepository.findOneBy({
      product: {
        id: product,
      },
      warehouse: {
        id: warehouse,
      },
    });

    return ResponseDto<ProductEntity>(Trace.TraceId(), result as any);
  }

  override async getPage(
    page: number,
    pagesize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<ProductEntity>> {
    const [data, total] = await this.productRepository.findAndCount({
      where: [
        { name: Like(`%${(where as any).name}%`) },
        { code: Like(`%${(where as any).code}%`) },
        { category: { name: Like(`%${(where as any).name}%`) } },
        where,
      ],
      relations,
      order,
      skip: page * pagesize,
      take: pagesize,
    });
    return ResponseDto<ProductEntity>(Trace.TraceId(), data, total);
  }
  override async findAll(
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<ProductEntity>> {
    const data = await this.productRepository.find({
      where: [
        {
          name: Like(`%${(where as any).name}%`),
        },
        { code: Like(`%${(where as any).code}%`) },
        where,
      ],
      relations,
      order,
    });
    return ResponseDto<ProductEntity>(Trace.TraceId(), data);
  }

  async getStockByWarehouse(
    page: number,
    pagesize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<WarehouseStockEntity>> {
    const [data, total] = await this.WarehouseStockRepository.findAndCount({
      where: [
        { product: { name: Like(`%${(where as any).product.name}%`) } },
        { product: { code: Like(`%${(where as any).product.code}%`) } },
        { warehouse: { name: Like(`%${(where as any).warehouse.name}%`) } },
        where,
      ],
      relations,
      order,
      skip: page * pagesize,
      take: pagesize,
    });

    return ResponseDto<WarehouseStockEntity>(Trace.TraceId(), data, total);
  }
}
