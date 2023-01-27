import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseStockEntity } from 'src/features/products/domain/models/warehouse_stock.entity';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { MovementDetailEntity } from '../domain/models/movement-detail.entity';
import { MovementDetailModel } from '../domain/models/movement-detail.model';
import { MovementDetailRepository } from '../domain/repositories/movement-detail.repository';

@Injectable()
export class MovementDetailInfrastructure
  extends BaseInfrastructure<MovementDetailModel>
  implements MovementDetailRepository
{
  constructor(
    @InjectRepository(MovementDetailEntity)
    private readonly Repository: Repository<MovementDetailEntity>,
    @InjectRepository(WarehouseStockEntity)
    public WarehouseProductRepository: Repository<WarehouseStockEntity>,
  ) {
    super(Repository);
  }

  async insertDetail(
    entity: MovementDetailEntity,
  ): Promise<MovementDetailEntity> {
    const getStock: WarehouseStockEntity =
      await this.WarehouseProductRepository.findOneBy({
        product: {
          id: entity.product as any,
        },
        warehouse: {
          id: entity['warehouse'],
        },
      });

    let stockSave = {};

    if (getStock) {
      const body = {
        id: getStock.id,
        stock:
          parseInt(getStock.stock.toString()) +
          parseInt(entity.quantity.toString()),
        stock_min: getStock.stock_min,
        notification: getStock.notification,
      } as any;
      stockSave = await this.WarehouseProductRepository.save(body);
    } else {
      let saveWarehouseStock: WarehouseStockEntity = {
        stock: entity.quantity,
        stock_min: 0,
        notification: false,
        product: entity.product,
        warehouse: entity['warehouse'],
      } as any;
      stockSave = await this.WarehouseProductRepository.save(
        saveWarehouseStock,
      );
    }

    const data = await this.Repository.save(entity);
    return data;
  }
}
