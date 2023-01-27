import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseStockEntity } from 'src/features/products/domain/models/warehouse_stock.entity';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { SaleDetailEntity } from '../domain/models/sale-detail.entity';
import { SaleDetailModel } from '../domain/models/sale-detail.model';
import { SaleDetailRepository } from '../domain/respositories/sale-detail.repository';

@Injectable()
export class SaleDetailInfrastructure
  extends BaseInfrastructure<SaleDetailModel>
  implements SaleDetailRepository
{
  constructor(
    @InjectRepository(SaleDetailEntity)
    private readonly detailRepository: Repository<SaleDetailEntity>,
    @InjectRepository(WarehouseStockEntity)
    private readonly WarehouseProductRepository: Repository<WarehouseStockEntity>,
  ) {
    super(detailRepository);
  }

  async insertDetail(entity: SaleDetailEntity): Promise<SaleDetailEntity> {
    const getStock: WarehouseStockEntity =
      await this.WarehouseProductRepository.findOneBy({
        product: {
          id: entity.product as any,
        },
        warehouse: {
          id: entity['warehouse'],
        },
      });

    let saveWarehouseStock: WarehouseStockEntity = {
      id: getStock.id,
      stock:
        parseInt(getStock.stock.toString()) -
        parseInt(entity.quantity.toString()),
    } as WarehouseStockEntity;
    await this.WarehouseProductRepository.save(saveWarehouseStock);
    entity.id = null;
    const data = await this.detailRepository.save(entity);
    return data;
  }
}
