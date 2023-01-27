import { Injectable, Inject } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { ProductModel } from '../domain/models/product.model';
import { ProductRepository } from '../domain/repositories/product.repository';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductApplication extends BaseApplication<ProductModel> {
  constructor(
    @Inject(BaseRepository)
    private productRepository: ProductRepository,
  ) {
    super(productRepository, new ProductDto());
  }
  async checkStock(Product: number, warehouse: number) {
    const result = await this.productRepository.checkStock(Product, warehouse);
    return result;
  }

  async getStockByWarehouse(
    page: number,
    pagesize: number,
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string },
  ) {
    return await this.productRepository.getStockByWarehouse(
      page,
      pagesize,
      where,
      relations,
      order,
    );
  }
}
