import { CategoryEntity } from 'src/features/categories/domain/models/category.entity';
import { GeneralEntity } from 'src/features/general/domain/models/general.entity';
import { UnitEntity } from 'src/features/unit/domain/models/unit.entity';
import { WarehouseStockEntity } from './warehouse_stock.entity';

export class ProductModel {
  constructor(
    public id: number,
    public name: string,
    public code: string,
    public description: string,
    public price_sale: number,
    public price_purchase: number,
    public discount: number,
    public category: number | CategoryEntity,
    // public sub_category: number | CategoryEntity,
    public unit: number | UnitEntity,
    public image: string[],
    public url: string,
    public price_cuarto: number,
    public price_media: number,
    public price_docena: number,
    public price_caja: number,
    public quantity_caja: number,

    public operation_type: number | GeneralEntity,
    public warehouse: number | WarehouseStockEntity | string | any,
    public status: boolean,
    public createdAt: Date,
  ) {}
}
